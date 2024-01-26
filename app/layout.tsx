import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from './components/Nav/Navbar'
import Footer from './components/Footer/Footer'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'

const popins = Poppins({ subsets: ['latin'], weight: ['400', "700"] })

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'Ecommerce APp',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${popins.className} text-slate-700`}>
        <Toaster toastOptions={{style:{
          background:"rgb(51 65 85)",
          color:"#fff"
        }}}/>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </CartProvider>

      </body>
    </html>
  )
}
