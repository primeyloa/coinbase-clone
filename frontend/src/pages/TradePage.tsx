import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronDown, ArrowDownUp, Info, Check } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Button from '../components/ui/Button'
import { cryptoAssets, formatCurrency, formatPercent } from '../data/crypto'

type Tab = 'buy' | 'sell'
type Step = 'form' | 'preview' | 'success'

const generateChartData = (basePrice: number) =>
  Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    price: basePrice * (0.97 + Math.sin(i * 0.3) * 0.02 + Math.random() * 0.01 + (i / 24) * 0.03),
  }))

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

export default function TradePage() {
  const [searchParams] = useSearchParams()
  const initialAssetId = searchParams.get('asset') || 'bitcoin'

  const [tab, setTab]               = useState<Tab>('buy')
  const [step, setStep]             = useState<Step>('form')
  const [selectedId, setSelectedId] = useState(initialAssetId)
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [amountUSD, setAmountUSD]   = useState('')
  const [loading, setLoading]       = useState(false)

  const asset = cryptoAssets.find(a => a.id === selectedId) ?? cryptoAssets[0]
  const chartData = useMemo(() => generateChartData(asset.price), [asset.id])

  const usdValue   = parseFloat(amountUSD) || 0
  const cryptoQty  = usdValue / asset.price
  const fee        = usdValue * 0.0149
  const total      = tab === 'buy' ? usdValue + fee : usdValue - fee

  const presets = [25, 50, 100, 200]

  const handlePreview = () => {
    if (usdValue > 0) setStep('preview')
  }

  const handleConfirm = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setStep('success')
  }

  const handleReset = () => {
    setAmountUSD('')
    setStep('form')
  }

  return (
    <div className="container-page py-10">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Chart section */}
        <div className="lg:col-span-3">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: asset.color }}
              >
                {asset.symbol.slice(0, 2)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-cb-text">{asset.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-bold text-cb-text">{formatCurrency(asset.price)}</span>
                  <span className={`text-sm font-semibold ${asset.change24h >= 0 ? 'text-cb-green' : 'text-cb-red'}`}>
                    {formatPercent(asset.change24h)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-cb-border rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              {['1H', '1D', '1W', '1M', '1Y'].map((range, i) => (
                <button
                  key={range}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                    i === 1
                      ? 'bg-cb-blue text-white'
                      : 'text-cb-text-muted hover:text-cb-text hover:bg-cb-gray'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tradeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={asset.color} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={asset.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="hour"
                    tick={{ fill: '#8A919E', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval={3}
                  />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={asset.color}
                    strokeWidth={2}
                    fill="url(#tradeGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Market cap', value: formatCurrency(asset.marketCap, true) },
              { label: 'Volume (24h)', value: formatCurrency(asset.volume24h, true) },
              { label: '7d change', value: formatPercent(asset.change7d), color: asset.change7d >= 0 ? 'text-cb-green' : 'text-cb-red' },
              { label: 'Symbol', value: asset.symbol },
            ].map(item => (
              <div key={item.label} className="bg-white border border-cb-border rounded-xl p-4">
                <p className="text-xs text-cb-text-muted mb-1">{item.label}</p>
                <p className={`text-sm font-bold ${item.color ?? 'text-cb-text'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trade panel */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-cb-border rounded-2xl overflow-hidden sticky top-24">
            {step === 'success' ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-cb-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-cb-green" />
                </div>
                <h3 className="text-xl font-bold text-cb-text mb-2">Order placed!</h3>
                <p className="text-cb-text-muted text-sm mb-2">
                  You {tab === 'buy' ? 'bought' : 'sold'}{' '}
                  <span className="text-cb-text font-semibold">{cryptoQty.toFixed(6)} {asset.symbol}</span>
                </p>
                <p className="text-cb-text-muted text-sm mb-8">
                  for <span className="text-cb-text font-semibold">{formatCurrency(total)}</span>
                </p>
                <div className="flex flex-col gap-3">
                  <Button fullWidth onClick={handleReset}>Place another order</Button>
                  <Link to="/dashboard">
                    <Button fullWidth variant="secondary">View portfolio</Button>
                  </Link>
                </div>
              </div>
            ) : step === 'preview' ? (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setStep('form')} className="text-cb-text-muted hover:text-cb-text transition-colors">←</button>
                  <h3 className="text-lg font-bold text-cb-text">Confirm {tab}</h3>
                </div>
                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { label: tab === 'buy' ? 'You spend' : 'You sell', value: formatCurrency(usdValue) },
                    { label: `${asset.symbol} amount`, value: `${cryptoQty.toFixed(6)} ${asset.symbol}` },
                    { label: `${asset.symbol} price`, value: formatCurrency(asset.price) },
                    { label: 'Coinbase fee (1.49%)', value: formatCurrency(fee) },
                    { label: 'Total', value: formatCurrency(total), bold: true },
                  ].map(row => (
                    <div key={row.label} className={`flex justify-between items-center py-2 ${row.bold ? 'border-t border-cb-border pt-4' : ''}`}>
                      <span className="text-sm text-cb-text-muted">{row.label}</span>
                      <span className={`text-sm ${row.bold ? 'font-bold text-cb-text text-base' : 'text-cb-text font-medium'}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <Button fullWidth size="lg" loading={loading} onClick={handleConfirm}>
                  Confirm {tab === 'buy' ? 'purchase' : 'sale'}
                </Button>
              </div>
            ) : (
              <>
                <div className="flex border-b border-cb-border">
                  {(['buy', 'sell'] as Tab[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`flex-1 py-4 text-sm font-bold capitalize transition-colors ${
                        tab === t
                          ? 'text-cb-blue border-b-2 border-cb-blue'
                          : 'text-cb-text-muted hover:text-cb-text'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="p-6 flex flex-col gap-5">
                  <div>
                    <label className="text-xs font-medium text-cb-text-muted mb-1.5 block">Asset</label>
                    <div className="relative">
                      <button
                        onClick={() => setSelectorOpen(v => !v)}
                        className="w-full flex items-center justify-between bg-cb-gray border border-cb-border rounded-xl px-4 py-3 hover:border-cb-text-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: asset.color }}>
                            {asset.symbol.slice(0, 2)}
                          </div>
                          <span className="text-sm font-semibold text-cb-text">{asset.name}</span>
                          <span className="text-xs text-cb-text-muted">{asset.symbol}</span>
                        </div>
                        <ChevronDown size={16} className={`text-cb-text-muted transition-transform ${selectorOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {selectorOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-cb-border rounded-xl shadow-lg z-10 max-h-56 overflow-y-auto">
                          {cryptoAssets.map(a => (
                            <button
                              key={a.id}
                              onClick={() => { setSelectedId(a.id); setSelectorOpen(false) }}
                              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-cb-gray transition-colors text-left ${a.id === selectedId ? 'bg-cb-gray' : ''}`}
                            >
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: a.color }}>
                                {a.symbol.slice(0, 2)}
                              </div>
                              <span className="text-sm text-cb-text flex-1">{a.name}</span>
                              <span className={`text-xs font-semibold ${a.change24h >= 0 ? 'text-cb-green' : 'text-cb-red'}`}>
                                {formatPercent(a.change24h)}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-cb-text-muted mb-1.5 block">Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cb-text-muted text-sm font-medium">$</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="0.00"
                        value={amountUSD}
                        onChange={e => setAmountUSD(e.target.value)}
                        className="w-full bg-cb-gray border border-cb-border rounded-xl pl-8 pr-16 py-3 text-cb-text text-lg font-bold placeholder-cb-gray-300 focus:outline-none focus:ring-2 focus:ring-cb-blue/30 focus:border-cb-blue transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cb-text-muted font-medium">USD</span>
                    </div>
                    {usdValue > 0 && (
                      <p className="text-xs text-cb-text-muted mt-1.5 flex items-center gap-1">
                        <ArrowDownUp size={10} />
                        ≈ {cryptoQty.toFixed(6)} {asset.symbol}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {presets.map(p => (
                      <button
                        key={p}
                        onClick={() => setAmountUSD(String(p))}
                        className={`text-xs font-semibold py-2 rounded-lg border transition-colors ${
                          parseFloat(amountUSD) === p
                            ? 'bg-cb-blue/10 border-cb-blue text-cb-blue'
                            : 'border-cb-border text-cb-text-muted hover:border-cb-text-muted hover:text-cb-text'
                        }`}
                      >
                        ${p}
                      </button>
                    ))}
                  </div>

                  {usdValue > 0 && (
                    <div className="flex items-start gap-2 bg-cb-gray border border-cb-border rounded-xl px-4 py-3">
                      <Info size={14} className="text-cb-text-muted mt-0.5 shrink-0" />
                      <p className="text-xs text-cb-text-muted">
                        Coinbase fee: <span className="text-cb-text font-medium">{formatCurrency(fee)}</span>
                        {' '}· Total: <span className="text-cb-text font-medium">{formatCurrency(total)}</span>
                      </p>
                    </div>
                  )}

                  <Button
                    fullWidth
                    size="lg"
                    disabled={usdValue <= 0}
                    onClick={handlePreview}
                    variant={tab === 'sell' ? 'danger' : 'primary'}
                  >
                    Preview {tab}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
