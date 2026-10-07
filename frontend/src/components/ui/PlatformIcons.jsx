export const WindowsIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21v-8.4h-9.5v7.1Zm0-15.4v7.2H21V3l-9.5 1.3Z" />
  </svg>
)

export const AndroidIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.6 9.48 19.44 6.3a.38.38 0 0 0-.14-.52.38.38 0 0 0-.52.14l-1.87 3.23A11.5 11.5 0 0 0 12 8.15c-1.78 0-3.46.37-4.91 1l-1.87-3.23a.38.38 0 0 0-.52-.14.38.38 0 0 0-.14.52L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52ZM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
  </svg>
)

export const PLATFORM_ICONS = {
  windows: WindowsIcon,
  android: AndroidIcon,
}
