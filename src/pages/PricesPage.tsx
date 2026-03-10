import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react'
import Input from '../components/ui/Input'
import Sparkline from '../components/ui/Sparkline'
import Button from '../components/ui/Button'
import { cryptoAssets, CryptoAsset, formatCurrency, formatPercent } from '../data/crypto'

type SortKey = 'marketCap' | 'price' | 'change24h' | 'volume24h'
type SortDir = 'asc' | 'desc'

export default function PricesPage() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('marketCap')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const filtered = cryptoAssets
    .filter(a =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: CryptoAsset, b: CryptoAsset) => {
      const mul = sortDir === 'asc' ? 1 : -1
      return (a[sortKey] - b[sortKey]) * mul
    })

  const SortBtn = ({ col, label }: { col: SortKey; label: string }) => (
    <button
      onClick={() => handleSort(col)}
      className="flex items-center gap-1 hover:text-cb-text transition-colors"
    >
      {label}
      <ArrowUpDown
        size={12}
        className={sortKey === col ? 'text-cb-blue' : 'opacity-40'}
      />
    </button>
  )

  const gainers = [...cryptoAssets].sort((a, b) => b.change24h - a.change24h).slice(0, 3)
  const losers  = [...cryptoAssets].sort((a, b) => a.change24h - b.change24h).slice(0, 3)

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <h1 className="heading-display text-3xl mb-2">Prices</h1>
        <p className="text-cb-text-secondary">Today's cryptocurrency prices by market cap</p>
      </div>

      {/* Top movers */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-cb-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-cb-green" />
            <span className="text-sm font-semibold text-cb-text">Top gainers (24h)</span>
          </div>
          <div className="flex flex-col gap-3">
            {gainers.map(a => (
              <Link to={`/trade?asset=${a.id}`} key={a.id} className="flex items-center justify-between hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: a.color }}>
                    {a.symbol.slice(0, 2)}
                  </div>
                  <span className="text-sm text-cb-text font-medium">{a.symbol}</span>
                </div>
                <span className="text-sm font-semibold text-cb-green">{formatPercent(a.change24h)}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-white border border-cb-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown size={16} className="text-cb-red" />
            <span className="text-sm font-semibold text-cb-text">Top losers (24h)</span>
          </div>
          <div className="flex flex-col gap-3">
            {losers.map(a => (
              <Link to={`/trade?asset=${a.id}`} key={a.id} className="flex items-center justify-between hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: a.color }}>
                    {a.symbol.slice(0, 2)}
                  </div>
                  <span className="text-sm text-cb-text font-medium">{a.symbol}</span>
                </div>
                <span className="text-sm font-semibold text-cb-red">{formatPercent(a.change24h)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search assets..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          prefix={<Search size={14} />}
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-cb-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cb-border text-left">
                <th className="px-5 py-4 text-xs font-semibold text-cb-text-muted w-6">#</th>
                <th className="px-4 py-4 text-xs font-semibold text-cb-text-muted">Name</th>
                <th className="px-4 py-4 text-xs font-semibold text-cb-text-muted text-right">
                  <SortBtn col="price" label="Price" />
                </th>
                <th className="px-4 py-4 text-xs font-semibold text-cb-text-muted text-right hidden sm:table-cell">
                  <SortBtn col="change24h" label="24h %" />
                </th>
                <th className="px-4 py-4 text-xs font-semibold text-cb-text-muted text-right hidden md:table-cell">
                  <SortBtn col="marketCap" label="Market Cap" />
                </th>
                <th className="px-4 py-4 text-xs font-semibold text-cb-text-muted text-right hidden lg:table-cell">
                  <SortBtn col="volume24h" label="Volume (24h)" />
                </th>
                <th className="px-4 py-4 text-xs font-semibold text-cb-text-muted hidden xl:table-cell">7d chart</th>
                <th className="px-4 py-4 text-xs font-semibold text-cb-text-muted"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset, idx) => (
                <tr
                  key={asset.id}
                  className="border-b border-cb-border last:border-0 hover:bg-cb-gray transition-colors"
                >
                  <td className="px-5 py-4 text-cb-text-muted text-sm">{idx + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: asset.color }}
                      >
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-cb-text">{asset.name}</p>
                        <p className="text-xs text-cb-text-muted">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-semibold text-cb-text">{formatCurrency(asset.price)}</span>
                  </td>
                  <td className="px-4 py-4 text-right hidden sm:table-cell">
                    <span
                      className={`text-sm font-semibold ${
                        asset.change24h >= 0 ? 'text-cb-green' : 'text-cb-red'
                      }`}
                    >
                      {formatPercent(asset.change24h)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right hidden md:table-cell">
                    <span className="text-sm text-cb-text-muted">{formatCurrency(asset.marketCap, true)}</span>
                  </td>
                  <td className="px-4 py-4 text-right hidden lg:table-cell">
                    <span className="text-sm text-cb-text-muted">{formatCurrency(asset.volume24h, true)}</span>
                  </td>
                  <td className="px-4 py-4 hidden xl:table-cell">
                    <Sparkline data={asset.sparkline} positive={asset.change7d >= 0} />
                  </td>
                  <td className="px-4 py-4">
                    <Link to={`/trade?asset=${asset.id}`}>
                      <Button size="sm" variant="outline">Buy</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-cb-text-muted">
            No assets match your search.
          </div>
        )}
      </div>
    </div>
  )
}
