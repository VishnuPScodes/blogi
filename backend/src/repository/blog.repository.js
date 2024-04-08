import BlogModel from '../models/Blog.model.js';
import LiveBlogModel from '../models/liveBlog.model.js';

export class BlogRepository {
  constructor() {
    this._model = BlogModel;
    this._liveBlogModel = LiveBlogModel;
  }

  async getAllBlog() {
    const Blog = this._model.find().lean();

    return Blog;
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

  async postBlogForOneUserByAdmin(params) {
    const {
      id,
      Blog,
      option1,
      option2,
      option3,
      option4,
      answer,
      difficulty,
      userId,
    } = params;
    const BlogCreated = await this._liveBlogModel.create({
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

    return BlogCreated;
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
    const Blog = await this._liveBlogModel.deleteMany({ userId });

    return Blog;
  }
}
