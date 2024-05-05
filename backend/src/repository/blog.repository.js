import { Blogs } from '../model/blog.model.js';
import { Comment } from '../model/comment.model.js';

export class BlogRepository {
  constructor() {
    this._model = Blogs;
    this._comment = Comment;
  }
  // getting all blogs ==> premiumuser will come first , new posts will come first , user's posts wont come

  async getAllBlog({ match, limit, skip }) {
    const Blogs = this._model.aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from: 'Comments',
          localField: '_id',
          foreignField: 'blogId',
          as: 'comments',
        },
      },
      {
        $addFields: {
          totalLikes: { $size: '$likes' },
          totalComments: { $size: '$comments' },
        },
      },
      {
        $sort: { createdAt: -1, isPremiumUser: 1 },
      },
      {
        $limit: limit,
      },
      {
        $skip: skip,
      },
    ]);

    return Blogs;
  }

  async createBlog(params) {
    const { userId, title, description, tags } = params;
    const postedBlog = await this._model.create({
      userId,
      title,
      description,
      tags,
    });

    return postedBlog;
  }
  // getting all blogs by user
  async getUserBlog(userId) {
    const Blog = this._model.find({ userId }).lean();

    return Blog;
  }

  async getBlogById(BlogId) {
    const Blog = this._model.findOne({ _id: BlogId });

    return Blog;
  }

  async createCommentByUser(comment, userId) {
    const postedComment = this._comment.create({
      blogId,
      userId,
      comment,
    });

    return postedComment;
  }

  async addCommentIdToBlog(blogId, commentId) {
    const updatedPost = await this._model.findOneAndUpdate(
      { _id: blogId },
      {
        $push: {
          comment: postedComment._id,
        },
      }
    );

    return updatedPost;
  }
  async likePost(params) {
    const { userId, blogId } = params;
    const post = this._comment.findOneAndUpdate(
      { blogId },
      {
        $push: { likes: userId },
      }
    );

    return post;
  }

  async hasUserAlreadyLiked({ userId, blogId }) {
    const user = this._comment.findOne({ blogId, likes: { $in: [userId] } });

    if (!user) {
      return 'no';
    }

    return 'yes';
  }

  async likePost({ userId, blogId }) {
    const blog = this._comment.findOneAndUpdate(
      { blogId },
      { $push: { likes: userId } }
    );

    return blog;
  }

  async unLikePost({ userId, blogId }) {
    const blog = this._comment.findOneAndUpdate(
      { blogId },
      { $pull: { likes: userId } }
    );

    return blog;
  }

  async getBlogWithMoreDifficultyLevel(difficultyLevel, userId) {
    const Blog = await this._model.findOne({
      userId,
      difficulty: { $gt: Number(difficultyLevel) },
    });

    return Blog;
  }

  async getBlogWithLessDifficultyLevel(difficultyLevel) {
    const Blog = await this._model.findOne({
      difficulty: { $lt: Number(difficultyLevel) },
    });
    return Blog;
  }

  async getOneLiveBlog(BlogId) {
    const Blog = await this._model.findOne({ _id: BlogId });

    return Blog;
  }

  async deleteAllBlogForTheUser(userId) {
    const Blog = await this._model.deleteMany({ userId });

    return Blog;
  }

  async deleteOneBlogForTheUser(userId, blogId) {
    const Blog = await this._model.findOneAndDelete({ userId, blogId });

    return Blog;
  }
  async getUserBlogs(userId) {
    const userBlogs = await this._model.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $lookup: {
          from: 'Comments',
          localField: '_id',
          foreignField: 'blogId',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'User',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $addFields: {
          totalLikes: { $size: '$likes' },
          totalComments: { $size: '$comments' },
        },
      },
      {
        $limit: limit,
      },
      {
        $skip: skip,
      },
      {
        $project: {
          user: {
            username: 1,
            profilePicture: 1,
          },
        },
      },
    ]);

    return userBlogs;
  }
}
