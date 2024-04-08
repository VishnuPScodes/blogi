import { BlogToUserServices_ } from '../services/BlogsToUser.service.js';
import { BadRequestError } from '../utils/response/error.js';

export const getAllBlogs = async (req, res) => {
  const blogs = await BlogToUserServices_.getAllBlogs();

  res.send(blogs);
};

export const getUserBlogs = async (req, res) => {
  const userId = req.params.userId;
  const userBlogs = await BlogToUserServices_.getUserBlogs(userId);

  res.send(userBlogs);
};

export const getBlogById = async (req, res) => {
  const BlogId = req.params.BlogId;
  const Blog = await BlogToUserServices_.getBlogById(BlogId);

  res.send(Blog);
};

export const createBlog = async (req, res) => {
  const { id, Blog, option1, option2, option3, option4, answer, difficulty } =
    req.body;
  const postedBlog = await BlogToUserServices_.createBlog({
    id,
    Blog,
    option1,
    option2,
    option3,
    option4,
    answer,
    difficulty,
  });
  if (!postedBlog) {
    throw new BadRequestError('Could not post the Blog');
  }

  res.send(postedBlog);
};

export const postBlogForOneUserByAdmin = async (req, res) => {
  const userId = req.params.userI;
  const { id, Blog, option1, option2, option3, option4, answer, difficulty } =
    req.body;
  const postedBlog = await BlogToUserServices_.postBlogForOneUserByAdmin({
    id,
    Blog,
    option1,
    option2,
    option3,
    option4,
    answer,
    difficulty,
    userId,
  });

  res.send(postedBlog);
};

export const userResponseEvaluation = async (req, res) => {
  const { BlogId, answer } = req.body;
  const nextBlog = await BlogToUserServices_.userResponseEvaluation({
    BlogId,
    answer,
  });

  res.send(nextBlog);
};

export const removeAllBlogsPerUser = async (req, res) => {
  const userId = req.params.userId;
  const removedBlogs = await BlogToUserServices_.removeAllBlogForTheUser(
    userId
  );

  res.send(removedBlogs);
};
