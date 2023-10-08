import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from './context/cartContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SuperPrice',
  description: 'Super Products and Super Prices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </CartProvider>
  )
}
