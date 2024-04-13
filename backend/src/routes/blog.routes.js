import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getUserBlogs,
  userLikeOrDisLikePost,
} from '../controller/blog.controller.js';
import { registerValidator } from '../middlewares/validators/blog/register.validators.js';
import { loginValidator } from '../middlewares/validators/blog/login.validators.js';
import { isAuthenticated } from '../middlewares/auth/isAuthenticated.js';

const blogRouter = express.Router();

blogRouter.get('/getblog', isAuthenticated, asyncHandler(getAllBlogs));
blogRouter.post('/getblog/:blogId', isAuthenticated, asyncHandler(getBlogById));
blogRouter.post('/createBlog', isAuthenticated, asyncHandler(createBlog));
blogRouter.post(
  '/getUserBlogs/:userId',
  isAuthenticated,
  asyncHandler(getUserBlogs)
);
blogRouter.post(
  '/createComment/:blogId',
  isAuthenticated,
  asyncHandler(getUserBlogs)
);
blogRouter.patch(
  '/likeOrDislike/:blogId',
  isAuthenticated,
  userLikeOrDisLikePost
);

export default blogRouter;
