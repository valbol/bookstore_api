import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { User } from '../models';

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }

    const token = jwt.sign(
      { userId: user._id, userName: user.userName, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION },
    );

    res.json({ message: 'Logged In Successfully!', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
