
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const viewport: Viewport = {
  themeColor: '#0F766E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'رواج - سوق المنتجات اليمنية الأصيلة',
  description: 'اكتشف أفضل المنتجات اليمنية من البن والعسل والمشغولات اليدوية والبخور في منصة رواج. دعم للأسر المنتجة والحرفيين اليمنيين.',
  keywords: 'اليمن, بن خولاني, عسل سدر, حرف يدوية, بخور عدني, تجارة الكترونية, رواج',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'رواج',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'رواج',
    title: 'رواج - كنوز اليمن بين يديك',
    description: 'تسوق أجود أنواع المنتجات اليمنية الأصلية مباشرة من الحرفيين والأسر المنتجة.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'رواج - سوق اليمن',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'رواج - سوق المنتجات اليمنية',
    description: 'اكتشف عبق التراث اليمني في منصة واحدة.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Alegreya:wght@400;700&display=swap" rel="stylesheet" />
        {/* Apple specific meta tags for better PWA experience */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="رواج" />
      </head>
      <body className="font-body antialiased bg-background min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
