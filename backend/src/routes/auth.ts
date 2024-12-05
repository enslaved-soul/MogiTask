import express ,{ Request, Response, NextFunction, Router } from 'express';
  import bcrypt from 'bcryptjs';
  import jwt from 'jsonwebtoken';
  import User from '../models/users';
  
  // Creating router
  const authRoutes: Router = express.Router();
  
  // Defining request body
  interface RequestBody {
    email: string;
    password: string;
    name?: string;
  }
  
  // Signup route handling
  authRoutes.post('/signup', async (req: Request, res: any, next: NextFunction) => {
    try {
      const { email, password, name } = req.body;
  
      // Validating inputs
      if (!email || !password || !name) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
      }
  
      // Checking if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Creating new user
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
      });
  
      // Saving the user
      await newUser.save();
  
      // Generating JWT
      const token = jwt.sign(
        { userId: newUser._id }, 
        process.env.JWT_SECRET || 'fallback_secret', 
        { expiresIn: '1h' }
      );
  
      // Returning response
      return res.status(201).json({
        token,
        user: { 
          id: newUser._id, 
          name: newUser.name, 
          email: newUser.email 
        },
      });
    } catch (err) {
      next(err);
    }
  });
  
  // Login route handler
  authRoutes.post('/login', async (req: Request, res: any , next: NextFunction) => {
    try {
      const { email, password } = req.body;
  
      // Validate inputs
      if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide both email and password' });
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET || 'fallback_secret', 
        { expiresIn: '1h' }
      );
  
      // Return response
      return res.json({
        token,
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email 
        },
      });
    } catch (err) {
      next(err);
    }
  });
  
  export default authRoutes;