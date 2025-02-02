const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  preparation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: true,
  },
  public: {
    type: Boolean,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // likes: {
  //   type: Number,
  // },
});

module.exports = mongoose.model('Recipe', recipeSchema);
