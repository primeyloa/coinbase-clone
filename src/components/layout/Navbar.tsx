import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Search, Globe } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { label: 'Cryptocurrencies', to: '/prices' },
  { label: 'Individuals', to: '#' },
  { label: 'Businesses', to: '#' },
  { label: 'Institutions', to: '#' },
  { label: 'Developers', to: '#' },
  { label: 'Company', to: '#' },
]

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-cb-border">
      <nav className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src="/coinbaseLogoNavigation-4.svg" alt="Coinbase" className="w-8 h-8" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 ml-6">
          {navLinks.map(link => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive && link.to !== '#'
                    ? 'text-cb-blue'
                    : 'text-cb-text hover:text-cb-blue'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2 ml-auto">
          <button className="p-2 rounded-full hover:bg-cb-gray transition-colors" aria-label="Search">
            <Search size={18} className="text-cb-text" />
          </button>
          <button className="p-2 rounded-full hover:bg-cb-gray transition-colors" aria-label="Language">
            <Globe size={18} className="text-cb-text" />
          </button>

          {isAuthenticated ? (
            <div ref={userRef} className="relative ml-2">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-cb-gray transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-cb-blue flex items-center justify-center text-white text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm text-cb-text font-medium">{user?.name}</span>
                <ChevronDown size={14} className="text-cb-text-muted" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-cb-border rounded-2xl shadow-lg overflow-hidden">
                  <Link
                    to="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-cb-text hover:bg-cb-gray transition-colors"
                  >
                    <LayoutDashboard size={15} />
                    Portfolio
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-cb-text hover:bg-cb-gray transition-colors"
                  >
                    <User size={15} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-cb-red hover:bg-cb-gray transition-colors w-full text-left"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <Link to="/signin" className="text-sm font-medium text-cb-text hover:text-cb-blue transition-colors">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="bg-cb-blue hover:bg-cb-blue-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg text-cb-text hover:bg-cb-gray"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-cb-border px-6 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive && link.to !== '#'
                    ? 'text-cb-blue bg-cb-blue-light'
                    : 'text-cb-text hover:bg-cb-gray'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-3 mt-2 border-t border-cb-border flex gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => { handleLogout(); setMobileOpen(false) }}
                className="flex-1 bg-cb-red/10 text-cb-red font-semibold rounded-full py-3 text-sm"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link to="/signin" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <button className="w-full bg-cb-gray text-cb-text font-semibold rounded-full py-3 text-sm border border-cb-border">
                    Sign in
                  </button>
                </Link>
                <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <button className="w-full bg-cb-blue text-white font-semibold rounded-full py-3 text-sm">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
