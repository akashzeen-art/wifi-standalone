import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Laptop, Smartphone, Tv, Wifi, Lock, Zap, Shield } from 'lucide-react'

export const PRELOADER_DURATION_MS = 6000

const VISUAL_SIZE = 240
const RING_RADIUS = 92
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const ORBIT_RADIUS = (VISUAL_SIZE / 200) * RING_RADIUS

const WIFI_ARCS = [
  'M37.3 65.3 A18 18 0 0 1 62.7 65.3',
  'M26 54 A34 34 0 0 1 74 54',
  'M14.6 42.6 A50 50 0 0 1 85.4 42.6',
]

const DEVICES = [
  { icon: Laptop,     angle: 0,   connectAt: 0.3 },
  { icon: Smartphone, angle: 120, connectAt: 0.55 },
  { icon: Tv,         angle: 240, connectAt: 0.8 },
]

const STATUS_STEPS = [
  'Scanning nearby networks',
  'Locking onto the strongest signal',
  'Boosting hotspot range',
  'Connecting your devices',
  'Securing your connection',
  'Almost ready',
]

const FEATURES = [
  { icon: Zap,    label: 'Lightning fast' },
  { icon: Shield, label: 'Secure' },
  { icon: Lock,   label: 'WPA2 encrypted' },
]

function WifiGlyph({ done }) {
  return (
    <svg viewBox="0 0 100 100" className="h-14 w-14">
      {WIFI_ARCS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="white"
          strokeWidth="9"
          strokeLinecap="round"
          initial={{ opacity: 0.35 }}
          animate={done ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
          transition={done ? { duration: 0.3 } : { duration: 1.4, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
        />
      ))}
      <circle cx="50" cy="78" r="7.5" fill="white" />
    </svg>
  )
}

export default function SitePreloader({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf
    let start
    let doneTimer
    const tick = now => {
      if (start === undefined) start = now
      const t = Math.min((now - start) / PRELOADER_DURATION_MS, 1)
      setProgress(t)
      if (t < 1) raf = requestAnimationFrame(tick)
      else doneTimer = setTimeout(onDone, 300)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow }
  }, [])

  const done = progress >= 1
  const eased = 1 - Math.pow(1 - progress, 1.8)
  const percent = Math.round(eased * 100)
  const stepIndex = Math.min(Math.floor(progress * STATUS_STEPS.length), STATUS_STEPS.length - 1)

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#030712] px-6 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
      aria-label={`Loading WiFiExtender, ${percent}%`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(36,80,234,0.35),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="site-preloader-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5990ff" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        className="relative flex w-full max-w-sm flex-col items-center text-center [@media(max-height:640px)]:scale-[0.8]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Signal visual */}
        <div className="relative" style={{ width: VISUAL_SIZE, height: VISUAL_SIZE }}>
          {!done && [0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -ml-12 -mt-12 h-24 w-24 rounded-full border-2 border-cyan-400/50"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
            />
          ))}

          <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
            <circle cx="100" cy="100" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke="url(#site-preloader-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - eased)}
              style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.7))' }}
            />
          </svg>

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          >
            {DEVICES.map(({ icon: DeviceIcon, angle, connectAt }) => {
              const connected = progress >= connectAt
              return (
                <div
                  key={angle}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${angle}deg) translateY(-${ORBIT_RADIUS}px) rotate(-${angle}deg)` }}
                >
                  <motion.div
                    className={`relative -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-2xl border backdrop-blur-md transition-colors duration-500 ${
                      connected
                        ? 'border-emerald-400/40 bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                        : 'border-white/10 bg-slate-800/80'
                    }`}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  >
                    <DeviceIcon className={`h-[18px] w-[18px] transition-colors duration-500 ${connected ? 'text-emerald-300' : 'text-slate-400'}`} />
                    {connected && (
                      <motion.span
                        className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#030712] bg-emerald-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      />
                    )}
                  </motion.div>
                </div>
              )
            })}
          </motion.div>

          <div className="absolute left-1/2 top-1/2 -ml-14 -mt-14 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 shadow-[0_0_60px_rgba(34,211,238,0.45)] ring-8 ring-white/5">
            <WifiGlyph done={done} />
          </div>
        </div>

        {/* Brand */}
        <motion.div
          className="mt-10 flex items-center gap-2.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-cyan-500 shadow-button">
            <Wifi className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            WiFi<span className="bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">Extender</span>
          </h1>
        </motion.div>
        <motion.p
          className="mt-2 text-sm text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          Share internet instantly, anywhere.
        </motion.p>

        {/* Progress */}
        <div className="mt-8 w-full max-w-xs">
          <div className="mb-2.5 flex items-center justify-between text-xs">
            <div className="relative h-4 flex-1 overflow-hidden text-left text-slate-300">
              <AnimatePresence mode="wait">
                <motion.span
                  key={done ? 'done' : stepIndex}
                  className="absolute inset-0 flex items-center gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-emerald-400' : 'animate-pulse bg-cyan-400'}`} />
                  {done ? 'Connected' : STATUS_STEPS[stepIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="font-semibold tabular-nums text-white">{percent}%</span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              style={{ width: `${percent}%` }}
            >
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {FEATURES.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-400">
              <Icon className="h-3 w-3 text-cyan-400" /> {label}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
