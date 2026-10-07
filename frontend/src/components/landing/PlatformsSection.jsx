import { Check } from 'lucide-react'
import { FadeUp, StaggerContainer, StaggerItem } from '../ui/Motion'
import { WindowsIcon, AndroidIcon } from '../ui/PlatformIcons'
import PlatformDownloadCard from '../download/PlatformDownloadCard'
import { DOWNLOADS, getRecommendedPlatform } from '../../lib/downloads'

const highlights = [
  'One account and license across both apps',
  'Same real-time device monitoring everywhere',
  'Block devices and track bandwidth on the go',
]

export default function PlatformsSection() {
  const recommended = getRecommendedPlatform()

  return (
    <section id="platforms" className="section bg-white">
      <div className="container-lg">
        <FadeUp className="text-center mb-14">
          <span className="badge-blue text-xs mb-4 inline-flex">
            <WindowsIcon className="w-3 h-3" />
            <AndroidIcon className="w-3 h-3" />
            Cross-platform
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Available on <span className="gradient-text">Windows &amp; Android</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Turn your Windows laptop or Android phone into a WiFi extender. Pick your device and get started in seconds.
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
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10">
            {highlights.map(h => (
              <li key={h} className="flex items-center gap-2 text-sm text-slate-600">
                <Check className="w-4 h-4 text-brand-500" /> {h}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  )
}
