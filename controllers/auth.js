require('dotenv').config();
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed!');
    error.statusCode = 422;
    error.data = errors.array();

    // throw error;
    return next(error);
  }

  const data = req.body;

  try {
    const hashedPw = await bcrypt.hash(data.password, 12);
    const cryptData = { ...data, password: hashedPw };
    const user = new User(cryptData);
    console.log(user);
    await user.save();
    res.status(201).json({
      message: 'User created successfully!',
      userId: user._id,
    });
  } catch (err) {
    console.log(err);
    // res.status(500).json({ message: 'Server error: ', err });
    err.statusCode = 500;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const data = req.body;
  let loadedUser;

  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      const error = new Error('User could not be found.');
      error.statusCode = 401;
      // throw error;
      return next(error);
    }

    loadedUser = user;

    const isEqualPw = await bcrypt.compare(data.password, user.password);

    if (!isEqualPw) {
      const error = new Error('Wrong credentials.');
      error.statusCode = 401;
      // throw error;
      return next(error);
    }

    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
    });
  } catch (err) {
    // res.status(400).json({ message: 'Server error: ', error });
    err.statusCode = 500;
    next(err);
  }
};
