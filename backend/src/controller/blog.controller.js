import { BlogServices_ } from '../service/blog.service.js';

export const getAllBlogs = async (req, res) => {
  try {
    const userId = req.user._id;
    let { search, page, limit } = req.query;
    page = page ? Number(page) : 1;
    limit = limit ? Number(limit) : 10;
    const blogs = await BlogServices_.getAllBlogs({
      userId,
      search,
      page,
      limit,
    });

    res.send(blogs);
  } catch (error) {
    console.log(error);
  }
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
  const { title, description, tags } = req.body;
  const userId = req.user._id;
  const postedBlog = await BlogServices_.createBlog({
    userId,
    title,
    description,
    tags,
  });

  res.send(postedBlog);
};

//making comment by other user
export const createComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { blogId } = req.params;
    const userId = req.user._id;
    const blog = await BlogServices_.createComment({
      userId,
      comment,
      blogId,
    });

    res.send(blog);
  } catch (error) {
    console.log(error);
  }
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
