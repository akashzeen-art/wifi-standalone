import { Download } from 'lucide-react'
import { DOWNLOADS } from '../../lib/downloads'

export default function DownloadButton({ platform = 'windows', className = 'btn-primary', children }) {
  const app = DOWNLOADS[platform]

  return (
    <a href={app.url} download={app.fileName} rel="noopener" className={className}>
      {children ?? (
        <>
          <Download className="w-5 h-5" />
          Download for {app.shortName}
        </>
      )}
    </a>
  )
}
