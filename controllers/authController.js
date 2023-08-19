import User from '../models/userSchema.js';

export const registerController = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next({
      message: 'Please provide username, email, and password',
      status: 'Failed',
    });
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    return next({
      message: 'User already Exist',
      status: 'Success',
    });
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
    status: 'Success',
    user,
  });
};
