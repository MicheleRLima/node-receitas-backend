const Recipe = require('../models/recipe');

exports.getFeaturedRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ public: true }).limit(5);
    res.status(200).json({
      message: 'Fetched successfully',
      recipes: recipes,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postNewRecipe = async (req, res, next) => {
  const recipe = new Recipe(req.body);
  console.log(recipe);
  try {
    await recipe.save();
    res.status(201).json({
      message: 'Recipe created successfully!',
      recipe: recipe,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ', error });
  }
};
