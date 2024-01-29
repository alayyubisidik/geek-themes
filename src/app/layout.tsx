"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './navbar'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
// import Footer from './footer'

const inter = Inter({ subsets: ['latin'] })

const disabledNavbar = ["/login", "/register"];

export default function RootLayout({ children }: { children: React.ReactNode}) {


  const pathName = usePathname();
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          {!disabledNavbar.includes(pathName) && <Navbar></Navbar>}
          <div className=' pt-[4rem] md:pt-[4.7rem] '>
            {children}
          </div>
          {/* {!disabledNavbar.includes(pathName) && <Footer></Footer>} */}
        </SessionProvider>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
      </body>
    </html>
  )
}
