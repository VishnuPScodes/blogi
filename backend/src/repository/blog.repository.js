import { Blogs } from '../model/blog.model.js';
import { Comment } from '../model/comment.model.js';
import LiveBlogModel from '../models/liveBlog.model.js';

export class BlogRepository {
  constructor() {
    this._model = Blogs;
    this._comment = Comment;
  }

  async getAllBlog() {
    const Blogs = this._model.find().lean();

    return Blogs;
  }

  async createBlog(params) {
    const { id, Blog, option1, option2, option3, option4, answer, difficulty } =
      params;
    const postedBlog = await BlogModel.create({
      id,
      Blog,
      option1,
      option2,
      option3,
      option4,
      answer,
      difficulty,
    });

    return postedBlog;
  }

  async getUserBlog(userId) {
    const Blog = this._model.find({ userId }).lean();

    return Blog;
  }

  async getBlogById(BlogId) {
    const Blog = this._model.findOne({ _id: BlogId });

    return Blog;
  }

  async createCommentByUser(params) {
    const { userId, comment } = params;
    const postedComment = this._comment.create({
      blogId,
      userId,
      comment,
    });

    return postedComment;
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
}
