import express from 'express';
import User from './../models/userSchema.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    const { password: _password, ...user } = newUser._doc;
    res.json({
      status: 'successful',
      statusCode: res.statusCode,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
