import { Download, Monitor, Key, Wifi, Check, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { WindowsIcon, AndroidIcon } from '../../components/ui/PlatformIcons'
import PlatformDownloadCard from '../../components/download/PlatformDownloadCard'
import { DOWNLOADS, getRecommendedPlatform } from '../../lib/downloads'

const steps = [
  { icon: Download, step: '01', title: 'Download the app',     desc: 'Download WiFiExtender for Windows or Android using the buttons above.' },
  { icon: Key,      step: '02', title: 'Activate your license', desc: 'Open the app, sign in, and paste your license key from the Subscription page.' },
  { icon: Wifi,     step: '03', title: 'Start your hotspot',   desc: 'Set your SSID and password, then click Start Hotspot.' },
  { icon: Monitor,  step: '04', title: 'Monitor devices',      desc: 'Connected devices appear here in real time. Block or monitor bandwidth.' },
]

const requirementGroups = [
  {
    icon: WindowsIcon,
    title: 'Windows Requirements',
    iconClass: 'text-brand-500',
    items: ['Windows 10 (1903+) or Windows 11', 'WiFi adapter with hosted network support', 'Administrator privileges', 'Active internet connection'],
  },
  {
    icon: AndroidIcon,
    title: 'Android Requirements',
    iconClass: 'text-emerald-500',
    items: ['Android 8.0 (Oreo) or newer', 'WiFi and location permissions', 'Install from unknown sources allowed', 'Active internet connection'],
  },
  {
    icon: Shield,
    title: 'Security',
    iconClass: 'text-emerald-500',
    items: ['Digitally signed installers', 'No background services or daemons', 'WPA2 encrypted hotspot', 'Served over secure HTTPS'],
  },
]

export default function DownloadPageDashboard() {
  const recommended = getRecommendedPlatform()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Download App</h1>
        <p className="text-slate-500 mt-1">Get WiFiExtender for Windows or Android.</p>
      </div>

      {/* Download cards */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {Object.values(DOWNLOADS).map((app, i) => (
          <motion.div
            key={app.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <PlatformDownloadCard app={app} recommended={app.key === recommended} />
          </motion.div>
        ))}
      </div>

      {/* Steps */}
      <h2 className="text-lg font-bold text-slate-900 mb-4">How to get started</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {steps.map(({ icon: Icon, step, title, desc }, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className="glass-card p-5 relative overflow-hidden group"
          >
            <div className="absolute top-3 right-4 text-5xl font-black text-slate-100 group-hover:text-brand-100 transition-colors leading-none select-none">
              {step}
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-3 shadow-sm relative z-10">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1.5 relative z-10">{title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed relative z-10">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Requirements */}
      <div className="grid md:grid-cols-3 gap-5">
        {requirementGroups.map(({ icon: Icon, title, iconClass, items }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.08 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon className={`w-5 h-5 ${iconClass}`} />
              <h3 className="font-semibold text-slate-900">{title}</h3>
            </div>
            <ul className="space-y-2.5">
              {items.map(r => (
                <li key={r} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Check className={`w-4 h-4 flex-shrink-0 ${iconClass}`} /> {r}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
