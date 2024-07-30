import User from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import ErrorHandler from '../utils/ErrorHandler.js';
import isAuthenticated from '../middleware/auth.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';

const router = express.Router();


router.post('/sign-up', catchAsyncErrors(async (req, res, next) => {
  const { fullName, email, contactNumber, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new ErrorHandler("user already exits!", 400));
    }

    const user = new User({ fullName, email, contactNumber, password });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

router.post('/login', catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user._id, role: user.role } }); // Include role in the response
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
export default router;
