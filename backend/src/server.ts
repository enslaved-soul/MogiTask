import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth'; // Adjust path if necessary


dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/mogi-task')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
