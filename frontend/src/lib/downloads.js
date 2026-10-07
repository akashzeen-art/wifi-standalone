export const DOWNLOADS = {
  windows: {
    key: 'windows',
    name: 'WiFiExtender for Windows',
    shortName: 'Windows',
    url: 'https://wifi.vault-x.world/downloads/wifi-extender-setup.exe',
    fileName: 'wifi-extender-setup.exe',
    version: '1.0.0',
    size: '~45 MB',
    platform: 'Windows 10 / 11',
    tagline: 'Turn your laptop into a fast, secure WiFi hotspot in seconds.',
    note: 'Requires admin privileges',
    accent: 'from-brand-600 to-cyan-500',
  },
  android: {
    key: 'android',
    name: 'WiFiExtender for Android',
    shortName: 'Android',
    url: 'https://wifi.vault-x.world/downloads/android-app.apk',
    fileName: 'android-app.apk',
    version: '1.0.0',
    size: '~18 MB',
    platform: 'Android 8.0+',
    tagline: 'Extend and manage your WiFi network right from your phone.',
    note: 'Allow installs from unknown sources',
    accent: 'from-emerald-500 to-teal-500',
  },
}

export function getRecommendedPlatform() {
  if (typeof navigator === 'undefined') return 'windows'
  return /android/i.test(navigator.userAgent) ? 'android' : 'windows'
}
