import { BlogServices_ } from '../service/blog.service.js';
import { BadRequestError } from '../utils/response/error.js';

export const getAllBlogs = async (req, res) => {
  const userId = req.user._id;
  const blogs = await BlogServices_.getAllBlogs(userId);

  res.send(blogs);
};

export const getUserBlogs = async (req, res) => {
  const userId = req.params.userId;
  const userBlogs = await BlogServices_.getUserBlogs(userId);

  res.send(userBlogs);
};

export const getBlogById = async (req, res) => {
  const BlogId = req.params.BlogId;
  const Blog = await BlogServices_.getBlogById(BlogId);

  res.send(Blog);
};

export const userLikeOrDisLikePost = async (req, res) => {
  const { blogId } = req.params;
  const { _id } = req.user;
  const Blog = await BlogServices_.userLikeOrDisLikePost({
    userId: _id,
    blogId,
  });

  res.send(Blog);
};

export const createBlog = async (req, res) => {
  const { userId, title, description, tags } = req.body;
  const postedBlog = await BlogServices_.createBlog({
    userId,
    title,
    description,
    tags,
  });
  if (!postedBlog) {
    throw new BadRequestError('Could not post the Blog');
  }

  res.send(postedBlog);
};

//making comment by other user
export const createComment = async (req, res) => {
  const { userId, comment } = req.body;
  const { blogId } = req.params;

  const blog = await BlogServices_.createComment({
    userId,
    comment,
    blogId,
  });
  if (!blog) {
    throw new BadRequestError('Could not post the comment');
  }

  res.send(blog);
};

export const removeAllBlogsPerUser = async (req, res) => {
  const userId = req.params.userId;
  const removedBlogs = await BlogServices_.removeAllBlogForTheUser(userId);

  res.send(removedBlogs);
};

export const deleteOneBlogForTheUser = async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.blogId;
  const removedBlogs = await BlogServices_.removeAllBlogForTheUser(
    userId,
    blogId
  );

  res.send(removedBlogs);
};
