import { Request, Response } from 'express';
import UserModel from '../models/user.model';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const testData = await UserModel.testUser();
    
    res.status(200).json({ 
      message: 'Profile data fetched successfully', 
      user: (req as any).user,
      testData: testData 
    });
  } catch (error: any) {
    console.error('Profile fetch failed:', error.message);
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
};