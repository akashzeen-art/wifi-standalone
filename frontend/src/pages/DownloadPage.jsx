import { Download, Monitor, Key, Wifi, Shield, Check, Lock, BadgeCheck, Zap } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ui/Motion'
import { WindowsIcon, AndroidIcon } from '../components/ui/PlatformIcons'
import PlatformDownloadCard from '../components/download/PlatformDownloadCard'
import { DOWNLOADS, getRecommendedPlatform } from '../lib/downloads'

const steps = [
  { icon: Download, step: '01', title: 'Download the app', desc: 'Pick your platform above and download WiFiExtender for Windows or Android.' },
  { icon: Key,      step: '02', title: 'Activate your license', desc: 'Open the app, sign in with your account, and enter your license key from the dashboard.' },
  { icon: Wifi,     step: '03', title: 'Start your hotspot', desc: 'Set your SSID and password, then click Start Hotspot. You\'re live in seconds.' },
  { icon: Monitor,  step: '04', title: 'Monitor devices', desc: 'Connected devices appear in real time. Block, monitor bandwidth, and stay in control.' },
]

const requirements = [
  {
    icon: WindowsIcon,
    title: 'Windows',
    color: 'bg-brand-50 text-brand-600',
    check: 'text-brand-500',
    items: [
      'Windows 10 (version 1903+) or Windows 11',
      'WiFi adapter with hosted network support',
      'Administrator privileges (for netsh commands)',
      'Active internet connection',
    ],
  },
  {
    icon: AndroidIcon,
    title: 'Android',
    color: 'bg-emerald-50 text-emerald-600',
    check: 'text-emerald-500',
    items: [
      'Android 8.0 (Oreo) or newer',
      'WiFi and location permissions enabled',
      'Install from unknown sources allowed',
      'Active internet connection',
    ],
  },
]

const security = [
  { title: 'Code signed', desc: 'Installers are digitally signed and verified.' },
  { title: 'No background services', desc: 'The app only runs when you open it.' },
  { title: 'WPA2 encryption', desc: 'Your hotspot uses WPA2 encryption by default.' },
  { title: 'Secure delivery', desc: 'Downloads are served over encrypted HTTPS.' },
]

const trust = [
  { icon: Lock,       label: 'Secure HTTPS download' },
  { icon: BadgeCheck, label: 'Virus scanned' },
  { icon: Zap,        label: 'Free with any plan' },
]

export default function DownloadPage() {
  const recommended = getRecommendedPlatform()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-night overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-night" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 glow-line" />
        <div className="relative max-w-5xl mx-auto text-center">
          <FadeUp>
            <span className="badge-night text-xs mb-4 inline-flex">
              <Wifi className="w-3.5 h-3.5" /> Windows &amp; Android
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Download <span className="gradient-text-light">WiFiExtender</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-12">
              Lightweight, fast, and built for reliability. Share and manage your internet from your laptop or your phone.
            </p>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto" stagger={0.12}>
            {Object.values(DOWNLOADS).map(app => (
              <StaggerItem key={app.key} className="h-full">
                <PlatformDownloadCard app={app} recommended={app.key === recommended} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10">
              {trust.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-2 text-sm text-slate-400">
                  <Icon className="w-4 h-4 text-emerald-400" /> {label}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Up and running in <span className="gradient-text">4 steps</span>
            </h2>
            <p className="text-slate-500">From download to live hotspot in under 60 seconds.</p>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.1}>
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <StaggerItem key={step}>
                <div className="glass-card p-6 h-full relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-5xl font-black text-slate-100 group-hover:text-brand-100 transition-colors duration-300 leading-none select-none">
                    {step}
                  </div>
                  <div className="w-11 h-11 bg-gradient-to-br from-brand-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-button relative z-10">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-[15px] relative z-10">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed relative z-10">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Requirements + Security */}
      <section className="py-16 px-6 bg-surface-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System requirements</h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {requirements.map(({ icon: Icon, title, color, check, items }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <div className="glass-card p-7 h-full">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-5 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
                  <ul className="space-y-3">
                    {items.map(r => (
                      <li key={r} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${check}`} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}

            <FadeUp delay={0.16}>
              <div className="glass-card p-7 h-full">
                <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Safe &amp; Secure</h3>
                <div className="space-y-4">
                  {security.map(item => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
