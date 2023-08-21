import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from './../models/userSchema.js';

// ? @desc   -  Auth user/set token
// ? route   -  POST /api/users/auth
// ? @access -  Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // const { password: _password, ...newUser } = user;
  console.log(user);
  const isMatched = await user.matchPassword(password);

  if (user && isMatched) {
    user.password = undefined;
    const { _password: password, ...userWithoutPassword } = user._doc;
    const token = generateToken(res, user._id);
    res.status(200).send({
      message: 'User Logged In',
      status: 'success',
      data: userWithoutPassword,
      token: token,
    });
  } else {
    res.status(200).json({ message: 'Invalid Credential' });
  }
});

// ? @desc   -  Register new User
// ? route   -  POST /api/users/
// ? @access -  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ username } && { email });
  if (userExists) {
    return next({
      message: 'User already exists',
      status: 'Bad request',
    });
  }
  const user = await User.create({ username, email, password });
  const { password: _password, ...newUser } = user._doc;
  if (user) {
    const token = generateToken(res, user._id);
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
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'User Logout' });
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
