import postService from '../services/postService.js';

class postController {
  async createPost(req, res) {
    try {
      const post = await postService.createPost(req.body, req.files.picture);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getAllPosts(req, res) {
    try {
      const posts = await postService.getAllPosts(req.query);
      return res.json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getPost(req, res) {
    try {
      const post = await postService.getPost(req.params.id);
      return res.json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async updatePost(req, res) {
    try {
      const updatedPost = await postService.updatePost(req.body);
      return res.json(updatedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async deletePost(req, res) {
    try {
      const post = await postService.deletePost(req.params.id);
      return res.json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new postController();
