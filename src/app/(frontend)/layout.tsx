import React from 'react'
import './styles.css'
import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}
