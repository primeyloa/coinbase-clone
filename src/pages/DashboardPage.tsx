import { Link, Navigate } from 'react-router-dom'
import { ArrowUpRight, ArrowDownRight, Plus, ArrowRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import { cryptoAssets, portfolioAssets, formatCurrency, formatPercent } from '../data/crypto'

const generateHistory = () => {
  const base = 42000
  return Array.from({ length: 30 }, (_, i) => ({
    day: `Mar ${i + 1}`,
    value: base + Math.sin(i * 0.4) * 5000 + i * 400 + Math.random() * 2000,
  }))
}
const history = generateHistory()

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-cb-border rounded-xl px-3 py-2 text-xs shadow-md">
        <p className="text-cb-text-muted mb-1">{label}</p>
        <p className="text-cb-text font-bold">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  const holdings = portfolioAssets.map(p => {
    const asset = cryptoAssets.find(a => a.id === p.assetId)!
    const currentValue = asset.price * p.amount
    const costBasis    = p.avgBuyPrice * p.amount
    const pnl          = currentValue - costBasis
    const pnlPct       = ((currentValue - costBasis) / costBasis) * 100
    return { asset, amount: p.amount, currentValue, costBasis, pnl, pnlPct }
  })

  const totalValue    = holdings.reduce((s, h) => s + h.currentValue, 0)
  const totalCost     = holdings.reduce((s, h) => s + h.costBasis, 0)
  const totalPnl      = totalValue - totalCost
  const totalPnlPct   = ((totalValue - totalCost) / totalCost) * 100
  const portfolioGain = totalPnl >= 0

  const currentPortfolioValue = history[history.length - 1].value

  return (
    <div className="container-page py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-cb-text-muted text-sm mb-1">Welcome back,</p>
          <h1 className="heading-display text-2xl capitalize">{user?.name}</h1>
        </div>
        <Link to="/trade">
          <Button className="gap-2">
            <Plus size={16} /> Buy crypto
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-cb-border rounded-2xl p-6 mb-6">
        <p className="text-cb-text-muted text-sm mb-1">Total portfolio value</p>
        <div className="flex items-end gap-4 mb-6">
          <h2 className="text-4xl font-bold text-cb-text">
            {formatCurrency(currentPortfolioValue)}
          </h2>
          <span
            className={`flex items-center gap-1 text-sm font-semibold mb-1 ${
              portfolioGain ? 'text-cb-green' : 'text-cb-red'
            }`}
          >
            {portfolioGain ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {formatPercent(totalPnlPct)} · {formatCurrency(Math.abs(totalPnl))} all time
          </span>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0052FF" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0052FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fill: '#8A919E', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0052FF"
                strokeWidth={2}
                fill="url(#portfolioGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-cb-text">Your assets</h3>
            <Link to="/trade" className="flex items-center gap-1 text-cb-blue text-sm hover:underline transition-colors">
              Trade <ArrowRight size={14} />
            </Link>
          </div>
          <div className="bg-white border border-cb-border rounded-2xl overflow-hidden">
            {holdings.map(({ asset, amount, currentValue, pnl, pnlPct }) => (
              <div
                key={asset.id}
                className="flex items-center justify-between px-5 py-4 border-b border-cb-border last:border-0 hover:bg-cb-gray transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: asset.color }}
                  >
                    {asset.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-cb-text text-sm">{asset.name}</p>
                    <p className="text-xs text-cb-text-muted">
                      {amount} {asset.symbol} · {formatCurrency(asset.price)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-cb-text text-sm">{formatCurrency(currentValue)}</p>
                  <p className={`text-xs font-medium ${pnl >= 0 ? 'text-cb-green' : 'text-cb-red'}`}>
                    {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)} ({formatPercent(pnlPct)})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-cb-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-cb-text-muted mb-4">Summary</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Total invested', value: formatCurrency(totalCost) },
                { label: 'Current value', value: formatCurrency(totalValue) },
                { label: 'Total P&L', value: formatCurrency(totalPnl), color: totalPnl >= 0 ? 'text-cb-green' : 'text-cb-red' },
                { label: 'Return', value: formatPercent(totalPnlPct), color: totalPnl >= 0 ? 'text-cb-green' : 'text-cb-red' },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-sm text-cb-text-muted">{row.label}</span>
                  <span className={`text-sm font-semibold ${row.color ?? 'text-cb-text'}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-cb-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-cb-text-muted mb-4">Allocation</h3>
            <div className="flex flex-col gap-3">
              {holdings.map(({ asset, currentValue }) => {
                const pct = (currentValue / totalValue) * 100
                return (
                  <div key={asset.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-cb-text-muted">{asset.symbol}</span>
                      <span className="text-cb-text font-medium">{pct.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 bg-cb-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: asset.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Link to="/trade">
            <Button fullWidth variant="outline" className="gap-2">
              <Plus size={16} /> Add funds
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
