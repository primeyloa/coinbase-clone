const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  register,
  login,
  getProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// @route   POST /api/auth/register
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

// @route   POST /api/auth/login
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  login
);

// @route   GET /api/auth/profile
router.get('/profile', protect, getProfile);

module.exports = router;