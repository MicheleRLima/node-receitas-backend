const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject('E-Mail address already exists.');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }),
    body('userName').trim().not().isEmpty(),
  ],
  authController.signup
);

router.post(
  '/login',
  [
    body('email', 'Please enter a valid email address.')
      .isEmail()
      .normalizeEmail(),
    body('password', 'Password has to be valid.').isLength({ min: 6 }).trim(),
  ],
  authController.login
);

module.exports = router;
