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

const blogRouter = express.Router();

blogRouter.get('/getblog', asyncHandler(getAllBlogs));
blogRouter.post('/getblog/:blogId', asyncHandler(getBlogById));
blogRouter.post('/createBlog', asyncHandler(createBlog));
blogRouter.post('/getUserBlogs/:userId', asyncHandler(getUserBlogs));
blogRouter.post('/createComment/:blogId', asyncHandler(getUserBlogs));
blogRouter.patch('/likeOrDislike/:blogId', userLikeOrDisLikePost);

export default blogRouter;
