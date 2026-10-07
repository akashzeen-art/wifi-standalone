import { Sparkles } from 'lucide-react'
import { PLATFORM_ICONS } from '../ui/PlatformIcons'
import DownloadButton from './DownloadButton'

export default function PlatformDownloadCard({ app, recommended = false }) {
  const Icon = PLATFORM_ICONS[app.key]

  return (
    <div
      className={`glass-card relative h-full p-7 flex flex-col text-left overflow-hidden ${
        recommended ? 'ring-2 ring-brand-500/30' : ''
      }`}
    >
      <div className={`pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${app.accent} opacity-10 blur-2xl`} />

      {recommended && (
        <span className="badge-blue text-[11px] absolute top-5 right-5">
          <Sparkles className="w-3 h-3" /> Recommended
        </span>
      )}

      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${app.accent} flex items-center justify-center shadow-button mb-5`}>
        <Icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="relative text-lg font-bold text-slate-900">{app.name}</h3>
      <p className="relative text-sm text-slate-500 mt-1.5 leading-relaxed">{app.tagline}</p>

      <div className="relative flex flex-wrap gap-2 mt-4 mb-6">
        <span className="badge-green text-xs"><div className="status-dot-green" /> v{app.version}</span>
        <span className="badge-gray text-xs">{app.platform}</span>
        <span className="badge-gray text-xs">{app.size}</span>
      </div>

      <div className="relative mt-auto">
        <DownloadButton platform={app.key} className="btn-primary w-full py-3.5 text-[15px]" />
        <p className="text-xs text-slate-400 mt-3 text-center">{app.note}</p>
      </div>
    </div>
  )
}
