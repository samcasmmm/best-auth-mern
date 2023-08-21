import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', registerUser);

router.post('/auth', authUser);

router.post('/logout', logoutUser);

router
  .route('/profile')
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);

export default router;
