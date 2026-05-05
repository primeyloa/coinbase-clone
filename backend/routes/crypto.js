const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getCryptos,
  getGainers,
  getNewListings,
  addCrypto,
} = require('../controllers/cryptoController');

// @route   GET /api/crypto
router.get('/', getCryptos);

// @route   GET /api/crypto/gainers
router.get('/gainers', getGainers);

// @route   GET /api/crypto/new
router.get('/new', getNewListings);

// @route   POST /api/crypto
router.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('symbol', 'Symbol is required').not().isEmpty(),
    body('price', 'Price is required').isNumeric(),
    body('image', 'Image URL is required').not().isEmpty(),
    body('change24h', '24h change is required').isNumeric(),
  ],
  addCrypto
);

module.exports = router;