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

// Helpful method guidance when an endpoint is requested with the wrong HTTP method
router.all('/register', (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method Not Allowed. Use POST /api/auth/register with JSON { name, email, password }',
    });
  }
  res.status(404).json({ message: 'Not found' });
});

router.all('/login', (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method Not Allowed. Use POST /api/auth/login with JSON { email, password }',
    });
  }
  res.status(404).json({ message: 'Not found' });
});

module.exports = router;