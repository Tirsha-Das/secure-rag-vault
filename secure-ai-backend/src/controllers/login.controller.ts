import { Request, Response } from 'express';
import LoginUser from '../models/user.model';
import { generateToken } from '../utils/jwt';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, password }: {email: string; password: string } = req.body; 
    console.log('Login request received with email:', email);
        if (!email || !password) {
          res.status(400).json({ error: 'Email and password are required' });
          return
        }

        // Validate user credentials
        const newUser = await LoginUser.loginUser({ email, password });
        console.log('User logged in with email:', newUser.email);

        const token = generateToken({ email: newUser.email });
        console.log('Token being sent to client:', token);
        res.status(201).json({ message: 'User logged in successfully', user: newUser, token });
  } catch (error: any) {  
    console.error('Login Failed:', error.message);
    if (error.message?.includes('User not found')) {
      res.status(404).json({ error: 'User not found' });
    } else if (error.message?.includes('Invalid password')) {
      res.status(401).json({ error: 'Invalid password' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}