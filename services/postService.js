import postModel from '../models/postModel.js';
import fileService from './fileService.js';

class PostService {
  async createPost(post, picture) {
    const arrFilesURL = [];
    Array.from(picture).forEach((picture) => {
      const fileName = fileService.saveFile(picture);
      arrFilesURL.push('http://localhost:5000/' + fileName);
    });
    const createdPost = await postModel.create({ ...post, picture: arrFilesURL });
    return createdPost;
  }

  async getAllPosts(queryParams) {
    const posts = await postModel.find(queryParams);

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

  async updatePost(post, picture) {
    if (!post._id) {
      throw new Error('ID is required');
    }

    let updatedPost;

    if (picture) {
      const arrFilesUpdateURL = [];
      Array.from(picture).forEach((picture) => {
        const fileName = fileService.saveFile(picture);
        arrFilesUpdateURL.push('http://localhost:5000/' + fileName);
      });
      updatedPost = await postModel.findByIdAndUpdate(post._id, { ...post, picture: arrFilesUpdateURL }, { new: true });

      const arrFilesURL = [];
      Array.from(picture).forEach((picture) => {
        const fileName = fileService.saveFile(picture);
        arrFilesURL.push('http://localhost:5000/' + fileName);
      });
    } else {
      updatedPost = await postModel.findByIdAndUpdate(post._id, post, { new: true });
    }

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
