import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
 
import Provider from './Provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat Application',
  description: 'Simple A chat application using graphQL and Prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        {children}
        </Provider>
        </body>
    </html>
  )
}
