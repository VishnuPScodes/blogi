// import { BlogsRepository } from '../repository/Blogs.repository.js';
import { NotFoundError, BadRequestError } from '../utils/response/error.js';
import bcrypt from 'bcryptjs';

class BlogServices {
  constructor() {
    this._BlogRepository = new BlogsRepository();
  }

  async getAllBlogs() {
    const allBlogs = await this._BlogRepository.getAllBlogs();
    if (!allBlogs) {
      throw new NotFoundError('Blogs not found!');
    }

    return allBlogs;
  }

  async createBlog(params) {
    const { id, Blog, option1, option2, option3, option4, answer, difficulty } =
      params;
    const postedBlog = await this._BlogRepository.createBlog({
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

    return postedBlog;
  }

  async getUserBlogs(userId) {
    const Blogs = await this._BlogRepository.getUserBlogs(userId);
    if (Blogs.length == 0) {
      throw new NotFoundError('No Blogs available for the user!');
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
    const BlogCreated = await this._BlogRepository.postBlogForOneUserByAdmin({
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
    if (!BlogCreated) {
      throw new BadRequestError('Could not post the Blog!');
    }

    return BlogCreated;
  }

  async userResponseEvaluation(params) {
    const { BlogId, answer } = params;
    const Blog = await this._BlogRepository.getBlogById(BlogId);

    if (!Blog) {
      throw new BadRequestError('Blog not found!');
    }
    const difficultyLevel = Blog.difficulty;

    const isAnswerCorrect = bcrypt.compareSync(answer, Blog?.answer);

    if (isAnswerCorrect) {
      const BlogWithMoreDifficulty =
        await this._BlogRepository.getBlogWithMoreDifficultyLevel(
          difficultyLevel
        );

      return BlogWithMoreDifficulty;
    }

    const BlogWithLessDifficulty =
      await this._BlogRepository.getBlogWithLessDifficultyLevel(
        difficultyLevel
      );

    return BlogWithLessDifficulty;
  }

  async removeAllBlogForTheUser(userId) {
    const Blog = await this._BlogRepository.deleteAllBlogForTheUser(userId);
    if (!Blog) {
      throw new BadRequestError('Could not remove the Blogs!');
    }

    return Blog;
  }
}

export const BlogServices_ = new BlogServices();
