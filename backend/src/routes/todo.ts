import express, { Request, Response, NextFunction } from 'express';
import auth, { AuthRequest } from '../middlewares/authMiddleware';
import Todo from '../models/todo';

const router = express.Router();

/**
 * POST: Create a new todo
 */
router.post('/', auth, async (req: AuthRequest, res: any, next: NextFunction) => {
  try {
    const { title, description } = req.body;
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const todo = new Todo({ title, description, userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

/**
 * GET: Get all todos for the authenticated user
 */
router.get('/', auth, async (req: AuthRequest, res: any, next: NextFunction) => {
  try {
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

/**
 * GET: Get a specific todo by ID
 */
router.get('/:id', auth, async (req: AuthRequest, res: any, next: NextFunction) => {
  try {
    const userId = req.user;
    const todoId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const todo = await Todo.findOne({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT: Update a specific todo by ID
 */
router.put('/:id', auth, async (req: AuthRequest, res: any, next: NextFunction) => {
  try {
    const userId = req.user;
    const todoId = req.params.id;
    const { title, description } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { title, description },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE: Delete a specific todo by ID
 */
router.delete('/:id', auth, async (req: AuthRequest, res: any, next: NextFunction) => {
  try {
    const userId = req.user;
    const todoId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const todo = await Todo.findOneAndDelete({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
