const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Crypto = require('./models/Crypto');

dotenv.config();

const seedCryptos = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67432.18,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    change24h: 2.34,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3541.72,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    change24h: 1.87,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 189.43,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    change24h: 4.21,
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.6234,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    change24h: -1.12,
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 0.7891,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    change24h: -0.54,
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    price: 9.14,
    image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    change24h: 3.56,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Crypto.deleteMany();
    await Crypto.insertMany(seedCryptos);
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();