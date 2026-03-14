import { Space_Grotesk, Inter } from 'next/font/google'
import '../src/styles/global.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: 'PS-ELAB — Electronic Labs',
  description: 'PS-ELAB — Diseño y fabricación de plaquetas electrónicas a medida para domótica, iluminación y desarrollo modular. Argentina.',
  keywords: 'plaquetas electrónicas, PCB, domótica, iluminación LED, Arduino, ESP32, electrónica Argentina',
  openGraph: {
    title: 'PS-ELAB — Electronic Labs',
    description: 'Ingeniería Electrónica a Medida. Diseño y fabricación de plaquetas electrónicas para domótica, iluminación y desarrollo modular.',
    type: 'website',
    url: 'https://svalino95.github.io/PSELAB/',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
