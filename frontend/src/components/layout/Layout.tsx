import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WarningBanner from '../ui/WarningBanner'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-cb-text">
      <WarningBanner />
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
