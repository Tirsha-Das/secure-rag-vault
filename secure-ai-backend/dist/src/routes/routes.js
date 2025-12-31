import express from 'express';
import * as userController from '../controllers/register.controller.js';
import * as loginController from '../controllers/login.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
const router = express.Router();
router.post('/register', userController.registerUser);
router.post('/login', loginController.loginUser);
router.get('/profile', authenticate, (req, res) => {
    res.json({ message: 'Protected route accessed', user: req.user });
});
export default router;
