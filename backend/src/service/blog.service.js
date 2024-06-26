import { BadRequestError, NotFoundError } from '../../utils/response/error.js';
import { BlogRepository } from '../repository/blog.repository.js';

class BlogServices {
  constructor() {
    this._BlogRepository = new BlogRepository();
  }

  async getAllBlogs({ userId, search, limit, page }) {
    if (!userId) {
      throw new NotFoundError('UserId not found!');
    }

    const skip = (page - 1) * limit;
    let match = {
      userId: { $ne: userId },
    };

    if (search) {
      const regex = new RegExp(search, 'i');
      match.$or = [
        { username: { $regex: regex } },
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    const allBlogs = await this._BlogRepository.getAllBlog({
      match,
      limit,
      skip,
    });

    if (!allBlogs) {
      throw new NotFoundError('Blogs not found!');
    }

    return allBlogs;
  }

  async createBlog(params) {
    const { userId, title, description, tags } = params;
    if (!userId) {
      throw new BadRequestError('UserId not found!');
    }
    const postedBlog = await this._BlogRepository.createBlog({
      userId,
      title,
      description,
      tags,
    });
    if (!postedBlog) {
      throw new BadRequestError('Could not post the Blog');
    }

    return postedBlog;
  }

  async createComment(params) {
    const { comment, userId, blogId } = params;
    if (!userId) {
      throw new BadRequestError('UserId not found!');
    }
    const postedComment = await this._BlogRepository.createCommentByUser({
      userId,
      comment,
      blogId,
    });
    console.log('coment', postedComment);
    if (!postedComment) {
      throw new BadRequestError('Could not post the comment');
    }
    const updatedBlogWithCommentId =
      await this._BlogRepository.addCommentIdToBlog(blogId, postedComment._id);
    if (!updatedBlogWithCommentId) {
      throw new BadRequestError('Could not post the comment');
    }

    return updatedBlogWithCommentId;
  }

  async getUserBlogs(userId) {
    const Blogs = await this._BlogRepository.getUserBlogs(userId);
    if (!Blogs) {
      throw new NotFoundError('could not get the blogs!');
    }

    return Blogs;
  }

  async getBlogById(BlogId) {
    const Blog = await this._BlogRepository.getBlogById(BlogId);
    if (!Blog) {
      throw new BadRequestError('Blog not found!');
    }

    return Blog;
  }

  async removeAllBlogForTheUser(userId) {
    const Blog = await this._BlogRepository.deleteAllBlogForTheUser(userId);
    if (!Blog) {
      throw new BadRequestError('Could not remove the Blogs!');
    }

    return Blog;
  }

  async deleteOneBlogForTheUser(userId, blogId) {
    const Blog = await this._BlogRepository.deleteOneBlogForTheUser(
      userId,
      blogId
    );
    if (!Blog) {
      throw new BadRequestError('Could not delete the Blog!');
    }

    return Blog;
  }
  async userLikeOrDisLikePost({ userId, blogId }) {
    const hasUserAlreadyLiked = await this._BlogRepository.hasUserAlreadyLiked({
      userId,
      blogId,
    });
    if (!hasUserAlreadyLiked) {
      throw new BadRequestError('Something went wrong!');
    }
    let post;
    if (hasUserAlreadyLiked == 'yes') {
      post = await this._BlogRepository.unLikePost();
      if (!post) {
        throw new BadRequestError('Could not unlike the post');
      }
    } else if (hasUserAlreadyLiked == 'no') {
      post = await this._BlogRepository.likePost();
      if (!post) {
        throw new BadRequestError('Could not like the post');
      }
    }

    return post;
  }
}

export const BlogServices_ = new BlogServices();
