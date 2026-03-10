export interface CryptoAsset {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  change7d: number
  marketCap: number
  volume24h: number
  sparkline: number[]
  color: string
  icon: string
}

export interface PortfolioAsset {
  assetId: string
  amount: number
  avgBuyPrice: number
}

export const cryptoAssets: CryptoAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67432.18,
    change24h: 2.34,
    change7d: 5.12,
    marketCap: 1_327_000_000_000,
    volume24h: 28_400_000_000,
    color: '#F7931A',
    icon: '₿',
    sparkline: [62000, 63500, 61000, 64000, 65500, 63000, 66000, 65000, 67000, 67432],
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3541.72,
    change24h: 1.87,
    change7d: -2.45,
    marketCap: 425_000_000_000,
    volume24h: 14_600_000_000,
    color: '#627EEA',
    icon: 'Ξ',
    sparkline: [3200, 3350, 3100, 3400, 3500, 3300, 3550, 3480, 3520, 3541],
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 189.43,
    change24h: 4.21,
    change7d: 11.34,
    marketCap: 85_000_000_000,
    volume24h: 3_200_000_000,
    color: '#9945FF',
    icon: 'S',
    sparkline: [165, 170, 162, 175, 180, 172, 185, 182, 187, 189],
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.6234,
    change24h: -1.12,
    change7d: 3.87,
    marketCap: 22_000_000_000,
    volume24h: 450_000_000,
    color: '#0033AD',
    icon: '₳',
    sparkline: [0.58, 0.60, 0.57, 0.62, 0.64, 0.61, 0.63, 0.62, 0.625, 0.623],
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    price: 0.7891,
    change24h: -0.54,
    change7d: -1.23,
    marketCap: 43_000_000_000,
    volume24h: 1_200_000_000,
    color: '#00AAE4',
    icon: '✕',
    sparkline: [0.82, 0.80, 0.78, 0.81, 0.79, 0.77, 0.80, 0.79, 0.788, 0.789],
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 9.14,
    change24h: 3.56,
    change7d: 8.92,
    marketCap: 12_000_000_000,
    volume24h: 380_000_000,
    color: '#E6007A',
    icon: '●',
    sparkline: [8.0, 8.3, 7.9, 8.5, 8.8, 8.5, 8.9, 8.9, 9.1, 9.14],
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.1823,
    change24h: 5.67,
    change7d: 15.23,
    marketCap: 26_000_000_000,
    volume24h: 1_800_000_000,
    color: '#C2A633',
    icon: 'Ð',
    sparkline: [0.155, 0.160, 0.152, 0.165, 0.170, 0.168, 0.175, 0.178, 0.181, 0.182],
  },
  {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    price: 18.47,
    change24h: 2.11,
    change7d: 6.34,
    marketCap: 11_000_000_000,
    volume24h: 600_000_000,
    color: '#375BD2',
    icon: '⬡',
    sparkline: [16.5, 17.0, 16.2, 17.5, 17.8, 17.3, 18.0, 18.2, 18.4, 18.47],
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 42.31,
    change24h: -2.34,
    change7d: 4.56,
    marketCap: 17_000_000_000,
    volume24h: 720_000_000,
    color: '#E84142',
    icon: 'A',
    sparkline: [40, 41, 39, 42, 43, 41, 42.5, 42, 42.4, 42.31],
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.9123,
    change24h: 1.45,
    change7d: -3.21,
    marketCap: 9_000_000_000,
    volume24h: 420_000_000,
    color: '#8247E5',
    icon: 'M',
    sparkline: [0.88, 0.90, 0.87, 0.92, 0.93, 0.91, 0.92, 0.91, 0.913, 0.912],
  },
]

export const portfolioAssets: PortfolioAsset[] = [
  { assetId: 'bitcoin', amount: 0.5, avgBuyPrice: 55000 },
  { assetId: 'ethereum', amount: 3.2, avgBuyPrice: 2800 },
  { assetId: 'solana', amount: 15, avgBuyPrice: 140 },
  { assetId: 'dogecoin', amount: 5000, avgBuyPrice: 0.12 },
]

export const formatCurrency = (value: number, compact = false): string => {
  if (compact) {
    if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
    if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`
  }
  if (value >= 1) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 6 }).format(value)
}

export const formatPercent = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}
