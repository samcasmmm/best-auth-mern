import User from '../models/userSchema.js';

export const registerController = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    next('Please provide username, email, and password');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    next('User already exists');
  }

  if (password?.length <= 6) {
    next('Password must be greater than 6 characters');
  }
  const newUser = await User.create({
    username,
    email,
    password,
  });
  const { password: _password, ...user } = newUser._doc;
  res.status(201).send({
    message: 'User Created Successfully',
    success: true,
    status: res.statusCode,
    user,
  });
};
