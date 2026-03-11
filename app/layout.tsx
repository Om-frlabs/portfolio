import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Om Mishra — AI Engineer & Founder of Fr Labs',
  description: 'Building AI infrastructure. 4 shipped projects. Talk to my AI.',
  metadataBase: new URL('https://om-portfolio.vercel.app'),
  openGraph: {
    title: 'Om Mishra — AI Engineer & Founder of Fr Labs',
    description: 'Building AI infrastructure. 4 shipped projects. Talk to my AI.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Om Mishra Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Mishra — AI Engineer & Founder of Fr Labs',
    description: 'Building AI infrastructure. 4 shipped projects. Talk to my AI.',
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>◈</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-display bg-void text-text-primary">
        {children}
      </body>
    </html>
  )
}
