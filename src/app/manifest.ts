
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'رواج - سوق المنتجات اليمنية الأصيلة',
    short_name: 'رواج',
    description: 'المنصة الأولى لتسويق وبيع المنتجات اليمنية الأصيلة من بن وعسل وحرف يدوية.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF9',
    theme_color: '#0F766E',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
