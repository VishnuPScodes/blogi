import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import {
  getUserInfo,
  loginUser,
  registerUser,
} from '../controller/auth.controller.js';
import { registerValidator } from '../middlewares/validators/auth/register.validators.js';
import { loginValidator } from '../middlewares/validators/auth/login.validators.js';

const authRouter = express.Router();

authRouter.get('/profile/:id', asyncHandler(getUserInfo));
authRouter.post('/register', registerValidator, asyncHandler(registerUser));
authRouter.post('/login', loginValidator, asyncHandler(loginUser));

export default authRouter;
