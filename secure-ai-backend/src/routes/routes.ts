import express from 'express';
import * as userController from '../controllers/register.controller';
import * as loginController from '../controllers/login.controller';
import * as profileController from '../controllers/profile.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', loginController.loginUser);
router.get('/profile', authenticate, profileController.getProfile);

export default router;