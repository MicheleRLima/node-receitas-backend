const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET para o feed inicial

router.get('/', feedController.getFeaturedRecipes);

router.post(
  '/receita/nova',
  isAuth,
  [
    body('title').trim().not().isEmpty(),
    body('ingredients').trim().not().isEmpty(),
    body('preparation').trim().not().isEmpty(),
  ],
  feedController.postNewRecipe
);

module.exports = router;
