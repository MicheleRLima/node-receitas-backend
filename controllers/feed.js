const Recipe = require('../models/recipe');
const User = require('../models/user');

exports.getFeaturedRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ public: true }).limit(5);
    res.status(200).json({
      message: 'Fetched successfully',
      recipes: recipes,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ', error });
  }
};

exports.postNewRecipe = async (req, res, next) => {
  const recipe = new Recipe({ ...req.body, creator: req.userId });

  try {
    await recipe.save();
    const user = await User.findById(req.userId);
    user.recipes.push(recipe._id);

    await user.save();

    res.status(201).json({
      message: 'Recipe created successfully!',
      recipe: recipe,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ', error });
  }
};
