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

export const userLikeOrDisLikePost = async (req, res) => {
  const { blogId } = req.params;
  const { _id } = req.user;
  const Blog = await BlogToUserServices_.userLikeOrDisLikePost({
    userId: _id,
    blogId,
  });

  res.send(Blog);
};

export const createBlog = async (req, res) => {
  const { userId, title, description, tags } = req.body;
  const postedBlog = await BlogToUserServices_.createBlog({
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

  const blog = await BlogToUserServices_.createComment({
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
  const removedBlogs = await BlogToUserServices_.removeAllBlogForTheUser(
    userId
  );

  res.send(removedBlogs);
};
