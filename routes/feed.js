const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET para o feed inicial

router.get('/', feedController.getFeaturedRecipes);

router.post('/receita/nova', feedController.postNewRecipe);

module.exports = router;
