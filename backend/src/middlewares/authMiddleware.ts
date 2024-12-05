import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = (decoded as any).id; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default auth;
