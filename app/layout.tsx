import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { AdminPanel } from '@/components/admin-panel'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CustomCursor } from '@/components/custom-cursor'
import { LayoutWrapper } from '@/components/layout-wrapper'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'SQUAD — College Technical Club',
  description:
    'SQUAD is a college technical club dedicated to innovation, engineering excellence, and a community of builders. Explore our events: CodeX, Project Expo, Outreach, and Unplugged.',
  generator: 'v0.app',
  keywords: [
    'SQUAD',
    'technical club',
    'CodeX',
    'Project Expo',
    'hackathon',
    'college club',
    'innovation',
    'MLRIT',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f1a2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: 'dark' }}
      className=""
    >
      <body className={`antialiased ${jakarta.variable}`}>
        <CustomCursor />
        <LayoutWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LayoutWrapper>
        <AdminPanel />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
