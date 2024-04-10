import { Blogs } from '../model/blog.model.js';
import LiveBlogModel from '../models/liveBlog.model.js';

export class BlogRepository {
  constructor() {
    this._model = Blogs;
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
    const BlogCreated = await this._model.create({
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
    const Blog = await this._model.deleteMany({ userId });

    return Blog;
  }
}
