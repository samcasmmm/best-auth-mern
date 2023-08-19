import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from './../models/userSchema.js';

// ? @desc   -  Auth user/set token
// ? route   -  POST /api/users/auth
// ? @access -  Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Auth User' });
});

// ? @desc   -  Register new User
// ? route   -  POST /api/users/
// ? @access -  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ username } && { email });
  if (userExists) {
    next({
      message: 'User already exists',
      status: 'Bad request',
    });
  }
  const user = await User.create({ username, email, password });
  const token = generateToken(res, user._id);
  const { password: _password, ...newUser } = user._doc;
  if (user) {
    res.status(201).send({
      message: 'A new user created',
      status: 'success',
      data: newUser,
      token: token,
    });
  }
});

// ? @desc   -  logout User
// ? route   -  POST /api/users/logout
// ? @access -  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logout User' });
});

// ? @desc   -  Get user profile
// ? route   -  GET /api/users/profile
// ? @access -  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User Profile' });
});

// ? @desc   -  Update user profile
// ? route   -  PUT /api/users/profile
// ? @access -  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update User' });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
