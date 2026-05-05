import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

interface CryptoAsset {
  _id: string
  name: string
  symbol: string
  price: number
  image: string
  change24h: number
  createdAt: string
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

const formatPercent = (value: number) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

const articles = [
  {
    image: '/Learn_Illustration_Ultimate_Guide_Bitcoin.png',
    title: 'USDC: The digital dollar for the global crypto economy',
    desc: 'Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more...',
  },
  {
    image: '/Replace_Bank.png',
    title: 'Can crypto really replace your bank account?',
    desc: "If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\" — the idea being that...",
  },
  {
    image: '/image.png',
    title: 'When is the best time to invest in crypto?',
    desc: 'Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause...',
  },
]

export default function HomePage() {
  const [featured, setFeatured] = useState<CryptoAsset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await api.crypto.getAll()
        setFeatured(data.slice(0, 6))
      } catch (err) {
        console.error('Failed to fetch featured cryptos', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  return (
    <div>
      {/* ============ SECTION 1: Hero ============ */}
      <section className="bg-white">
        <div className="container-page py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Phone mockup */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-900 rounded-3xl overflow-hidden p-8 flex items-center justify-center min-h-[400px] lg:min-h-[520px]">
                <img
                  src="/Hero__4_.webp"
                  alt="Coinbase App"
                  className="max-h-[460px] w-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right — Copy */}
            <div>
              <h1 className="heading-display text-display-lg mb-6">
                The future of finance is here.
              </h1>
              <p className="text-cb-text-secondary text-lg mb-8 max-w-md">
                Trade crypto and more on a platform you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  placeholder="satoshi@nakamoto.com"
                  className="flex-1 border border-cb-border rounded-lg px-4 py-3.5 text-sm text-cb-text placeholder-cb-text-muted 
                             focus:outline-none focus:ring-2 focus:ring-cb-blue/30 focus:border-cb-blue transition-colors"
                />
                <Link to="/signup">
                  <button className="btn-blue whitespace-nowrap">Sign up</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: Explore crypto ============ */}
      <section className="section-gray">
        <div className="container-page py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — Copy */}
            <div className="lg:pt-12">
              <h2 className="heading-display text-display-md mb-4">
                Explore crypto like Bitcoin, Ethereum, and Dogecoin.
              </h2>
              <p className="text-cb-text-secondary text-base mb-8 max-w-md">
                Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
              </p>
              <Link to="/prices">
                <button className="btn-dark">See more assets</button>
              </Link>
            </div>

            {/* Right — Dark card with crypto list */}
            <div className="bg-cb-surface-dark rounded-3xl p-6 lg:p-8">
              {/* Tabs */}
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full">Tradable</span>
                <span className="text-white/50 text-sm font-medium cursor-pointer hover:text-white/80 transition-colors">Top gainers</span>
                <span className="text-white/50 text-sm font-medium cursor-pointer hover:text-white/80 transition-colors">New on Coinbase</span>
              </div>

              {/* Crypto rows */}
              <div className="flex flex-col">
                {featured.map((asset, i) => (
                  <Link
                    key={asset._id}
                    to={`/trade?asset=${asset._id}`}
                    className={`flex items-center justify-between py-5 ${
                      i < featured.length - 1 ? 'border-b border-white/10' : ''
                    } hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <span className="text-white text-lg font-medium">{asset.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatCurrency(asset.price)}</p>
                      <p className={`text-sm ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatPercent(asset.change24h)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: Advanced Trading ============ */}
      <section className="bg-white">
        <div className="container-page py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Image */}
            <div className="bg-cb-surface-dark rounded-3xl overflow-hidden flex items-center justify-center p-4 min-h-[320px]">
              <img
                src="/Advanced.webp"
                alt="Advanced Trading"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            {/* Right — Copy */}
            <div>
              <h2 className="heading-display text-display-md mb-6">
                Powerful tools, designed for the advanced trader.
              </h2>
              <p className="text-cb-text-secondary text-base mb-8 max-w-md leading-relaxed">
                Powerful analytical tools with the safety and security of Coinbase
                deliver the ultimate trading experience. Tap into sophisticated
                charting capabilities, real-time order books, and deep liquidity
                across hundreds of markets.
              </p>
              <Link to="/trade">
                <button className="btn-dark">Start trading</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4: Coinbase One ============ */}
      <section className="bg-white">
        <div className="container-page py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Copy */}
            <div>
              <div className="inline-flex items-center gap-2 border border-cb-border rounded-full px-4 py-2 mb-6">
                <img src="/coinbaseLogoNavigation-4.svg" alt="" className="w-4 h-4" />
                <span className="text-sm font-medium text-cb-text">COINBASE ONE</span>
              </div>
              <h2 className="heading-display text-display-md mb-6">
                Zero trading fees, more rewards.
              </h2>
              <p className="text-cb-text-secondary text-base mb-8 max-w-md leading-relaxed">
                Get more out of crypto with one membership: zero trading fees,
                boosted rewards, priority support, and more.
              </p>
              <button className="btn-dark">Claim free trial</button>
            </div>

            {/* Right — Image */}
            <div className="bg-cb-gray rounded-3xl overflow-hidden flex items-center justify-center p-8">
              <img
                src="/zero_fees_us.webp"
                alt="Zero trading fees"
                className="max-h-[420px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 5: Base App ============ */}
      <section className="section-gray">
        <div className="container-page py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Image */}
            <div className="bg-cb-gray-200 rounded-3xl overflow-hidden flex items-center justify-center p-8">
              <img
                src="/0_4mVyVaU6yLa--GR_.webp"
                alt="Base App"
                className="max-h-[420px] w-auto object-contain rounded-2xl"
              />
            </div>

            {/* Right — Copy */}
            <div>
              <div className="inline-flex items-center gap-2 border border-cb-border rounded-full px-4 py-2 mb-6">
                <img src="/coinbaseLogoNavigation-4.svg" alt="" className="w-4 h-4" />
                <span className="text-sm font-medium text-cb-text">BASE APP</span>
              </div>
              <h2 className="heading-display text-display-md mb-6">
                Countless ways to earn crypto with the Base App.
              </h2>
              <p className="text-cb-text-secondary text-base mb-8 max-w-md leading-relaxed">
                An everything app to trade, create, discover, and chat, all in one place.
              </p>
              <button className="btn-dark">Learn more</button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 6: Learn ============ */}
      <section className="section-gray">
        <div className="container-page py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <h2 className="heading-display text-cb-text-secondary text-display-sm mb-2">New to crypto?</h2>
              <h3 className="heading-display text-display-md">
                Learn some crypto basics
              </h3>
            </div>
            <div className="flex items-end justify-start lg:justify-end">
              <p className="text-cb-text-secondary text-base max-w-md mb-4">
                Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between.
              </p>
            </div>
          </div>
          <div className="flex justify-end mb-10">
            <button className="btn-dark">Read More</button>
          </div>

          {/* Article cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map(article => (
              <div key={article.title} className="group cursor-pointer">
                <div className="rounded-2xl overflow-hidden mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="heading-display text-xl text-cb-text mb-2 group-hover:text-cb-blue transition-colors">
                  {article.title}
                </h4>
                <p className="text-cb-text-secondary text-sm leading-relaxed">
                  {article.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 7: Take Control CTA ============ */}
      <section className="bg-white">
        <div className="container-page py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Copy */}
            <div>
              <h2 className="heading-display text-display-lg mb-6">
                Take control of your money
              </h2>
              <p className="text-cb-text-secondary text-lg mb-8">
                Start your portfolio today and discover crypto
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  placeholder="satoshi@nakamoto.com"
                  className="flex-1 border border-cb-border rounded-lg px-4 py-3.5 text-sm text-cb-text placeholder-cb-text-muted 
                             focus:outline-none focus:ring-2 focus:ring-cb-blue/30 focus:border-cb-blue transition-colors"
                />
                <Link to="/signup">
                  <button className="btn-blue whitespace-nowrap">Sign up</button>
                </Link>
              </div>
            </div>

            {/* Right — Crypto coins image */}
            <div className="flex justify-center">
              <img
                src="/CB_LOLP__1_.webp"
                alt="Crypto coins"
                className="max-h-[400px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
