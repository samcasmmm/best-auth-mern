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
      user: userWithoutPassword,
      token: token,
    });
  } else {
    res.status(401).json({ message: 'Invalid Credential' });
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
  if (password.length < 5) {
    return res.status(400).json({
      message: 'password must be 5',
      status: 'User Bad request',
    });
  }
  const user = await User.create({ username, email, password });
  const { password: _password, ...newUser } = user._doc;
  if (user) {
    const token = generateToken(res, user._id);
    return res.status(201).send({
      message: 'A new user created',
      status: 'success',
      user: newUser,
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
  console.log(req.user);
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };

  res.status(200).json({ message: 'User Profile', status: 'success', user });
});

// ? @desc   -  Update user profile
// ? route   -  PUT /api/users/profile
// ? @access -  Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).json({
      message: 'User is updated',
      status: 'success',
      user: updatedUser,
    });
  } else {
    return res.status(404).json({
      message: 'User not found',
      status: 404,
    });
  }
});

// ? @desc   -  get all user
// ? route   -  GET /api/users/
// ? @access -  Private

const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      message: 'Users fetched successfully',
      status: 'success',
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching users',
      status: 'error',
    });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
};
