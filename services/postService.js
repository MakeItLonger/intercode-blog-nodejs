import postModel from '../models/postModel.js';
import fileService from './fileService.js';

class PostService {
  async createPost(post, picture) {
    const fileName = fileService.saveFile(picture);
    const createdPost = await postModel.create({ ...post, picture: fileName });
    return createdPost;
  }

  async getAllPosts() {
    const posts = await postModel.find();

    return posts;
  }

  async getPost(id) {
    if (!id) {
      throw new Error('ID is required');
      s;
    }

    const post = await postModel.findById(id);

    return post;
  }

  async updatePost(post) {
    if (!post._id) {
      throw new Error('ID is required');
    }

    const updatedPost = await postModel.findByIdAndUpdate(post._id, post, { new: true });

    return updatedPost;
  }

  async deletePost(id) {
    if (!id) {
      throw new Error('ID is required');
    }

    const post = await postModel.findByIdAndDelete(id);

    return post;
  }
}

export default new PostService();
