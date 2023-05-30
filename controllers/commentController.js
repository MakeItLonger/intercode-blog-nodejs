import commentService from '../services/commentService.js';

class commentController {
  async createComment(req, res) {
    try {
      const comment = await commentService.createComment(req.body);
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllComments(req, res) {
    try {
      const comments = await commentService.getAllComments(req.params.postID);
      return res.json(comments);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getComment(req, res) {
    try {
      const comment = await commentService.getComment(req.params.id);
      return res.json(comment);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateComment(req, res) {
    try {
      const updatedComment = await commentService.updateComment(req.body);

      return res.json(updatedComment);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteComment(req, res) {
    try {
      const comment = await commentService.deleteComment(req.params.id);
      return res.json(comment);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new commentController();
