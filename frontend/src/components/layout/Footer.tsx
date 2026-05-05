import { Link } from 'react-router-dom'

const footerSections = {
  Company: ['About', 'Careers', 'Affiliates', 'Blog', 'Press', 'Security', 'Investors', 'Vendors', 'Legal & privacy'],
  Individuals: ['Buy & sell', 'Earn free crypto', 'Base App', 'Coinbase One', 'Debit Card'],
  Businesses: ['Asset Listings', 'Coinbase Business', 'Payments'],
  Developers: ['Developer Platform', 'Base', 'Server Wallets', 'Embedded Wallets', 'Onramp & Offramp', 'Trade API'],
  Support: ['Help center', 'Contact us', 'Create account', 'ID verification', 'Account information', 'Payment methods'],
}

export default function Footer() {
  return (
    <footer className="bg-cb-gray border-t border-cb-border">
      {/* Disclaimer */}
      <div className="container-page py-8 text-center">
        <p className="text-cb-text-muted text-xs leading-relaxed max-w-4xl mx-auto">
          Products and features may not be available in all regions. Information is for or informational purposes only, and is not (i) an offer, or
          solicitation of an offer, to invest in, or to buy or sell, any interests or shares, or to participate in any investment or trading strategy or (ii)
          intended to provide accounting, legal, or tax advice, or investment recommendations. Trading cryptocurrency comes with risk.
        </p>
      </div>

      {/* Links grid */}
      <div className="container-page pb-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <img src="/coinbaseLogoNavigation-4.svg" alt="Coinbase" className="w-10 h-10 text-cb-blue" />
            </Link>
          </div>

          {/* Link columns */}
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-cb-text text-sm font-semibold mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(label => (
                  <li key={label}>
                    <Link
                      to="#"
                      className="text-cb-text-secondary hover:text-cb-text text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-6 mt-10 pt-6 border-t border-cb-border">
          <a href="#" aria-label="X"><img src="/x-light.svg" alt="X" className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" /></a>
          <a href="#" aria-label="LinkedIn"><img src="/linkedin-light.svg" alt="LinkedIn" className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" /></a>
          <a href="#" aria-label="Instagram"><img src="/instagram-light.svg" alt="Instagram" className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" /></a>
          <a href="#" aria-label="TikTok"><img src="/tiktok-light.svg" alt="TikTok" className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" /></a>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-cb-text-muted">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Coinbase</span>
            <span>·</span>
            <Link to="#" className="hover:text-cb-text transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="#" className="hover:text-cb-text transition-colors">Terms & Conditions</Link>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Global · English</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
