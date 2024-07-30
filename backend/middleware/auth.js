import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import catchAsyncErrors from './catchAsyncErrors.js';
import ErrorHandler from '../utils/ErrorHandler.js';

const isAuthenticated = catchAsyncErrors(async (req,res,next) => {
  const {token} = req.cookies;

  if(!token){
      return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

export default isAuthenticated;
