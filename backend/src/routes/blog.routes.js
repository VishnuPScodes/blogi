import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import {
  createBlog,
  createComment,
  getAllBlogs,
  getBlogById,
  getUserBlogs,
  userLikeOrDisLikePost,
} from '../controller/blog.controller.js';
import { isAuthenticated } from '../middlewares/auth/isAuthenticated.js';

const blogRouter = express.Router();

blogRouter.get('/getblog', isAuthenticated, asyncHandler(getAllBlogs));
blogRouter.get('/getblog/:blogId', isAuthenticated, asyncHandler(getBlogById));
blogRouter.post('/createBlog', isAuthenticated, asyncHandler(createBlog));
blogRouter.get(
  '/getUserBlogs/:userId',
  isAuthenticated,
  asyncHandler(getUserBlogs)
);
blogRouter.post(
  '/createComment/:blogId',
  isAuthenticated,
  asyncHandler(createComment)
);
blogRouter.patch(
  '/likeOrDislike/:blogId',
  isAuthenticated,
  userLikeOrDisLikePost
);

export default blogRouter;
