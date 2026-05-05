const { validationResult } = require('express-validator');
const Crypto = require('../models/Crypto');

// Mock data for testing when DB is not available
const mockCryptos = [
  {
    _id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67432.18,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    change24h: 2.34,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3541.72,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    change24h: 1.87,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    name: 'Solana',
    symbol: 'SOL',
    price: 189.43,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    change24h: 4.21,
    createdAt: new Date().toISOString(),
  },
];

// @desc    Get all cryptocurrencies
// @route   GET /api/crypto
// @access  Public
const getCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find({});
    if (cryptos.length === 0) {
      // Return mock data if DB is empty
      return res.json(mockCryptos);
    }
    res.json(cryptos);
  } catch (error) {
    console.error(error);
    // Return mock data on DB error
    res.json(mockCryptos);
  }
};

// @desc    Get top gainers
// @route   GET /api/crypto/gainers
// @access  Public
const getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({}).sort({ change24h: -1 });
    if (gainers.length === 0) {
      const sorted = [...mockCryptos].sort((a, b) => b.change24h - a.change24h);
      return res.json(sorted);
    }
    res.json(gainers);
  } catch (error) {
    console.error(error);
    const sorted = [...mockCryptos].sort((a, b) => b.change24h - a.change24h);
    res.json(sorted);
  }
};

// @desc    Get new listings
// @route   GET /api/crypto/new
// @access  Public
const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find({}).sort({ createdAt: -1 });
    if (newListings.length === 0) {
      const sorted = [...mockCryptos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json(sorted);
    }
    res.json(newListings);
  } catch (error) {
    console.error(error);
    const sorted = [...mockCryptos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(sorted);
  }
};

// @desc    Add new cryptocurrency
// @route   POST /api/crypto
// @access  Public (or Private if needed)
const addCrypto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, symbol, price, image, change24h } = req.body;

  try {
    // Check if crypto exists
    const cryptoExists = await Crypto.findOne({ symbol });

    if (cryptoExists) {
      return res.status(400).json({ message: 'Cryptocurrency already exists' });
    }

    // Create crypto
    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      image,
      change24h,
    });

    if (crypto) {
      res.status(201).json(crypto);
    } else {
      res.status(400).json({ message: 'Invalid crypto data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCryptos,
  getGainers,
  getNewListings,
  addCrypto,
};