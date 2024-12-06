import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export interface AuthRequest extends Request {
  user?: string; // Adds a `user` property to the request
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Extract token from either x-auth-token header or Authorization header (Bearer token)
  const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return; // This will terminate the function, no further code will execute.
  }

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach the decoded user ID to the request object
    req.user = (decoded as any).userId; // Ensure you're using the correct field name for user ID in the token payload
    
    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid or expired
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default auth;
