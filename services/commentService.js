import commentModel from '../models/commentModel.js';

class CommentService {
  async createComment(comment) {
    const createdComment = await commentModel.create(comment);
    return createdComment;
  }

  async getAllComments(postID) {
    const comments = await commentModel.find({ postID });

    return comments;
  }

  async getComment(id) {
    if (!id) {
      throw new Error('ID is required');
      s;
    }

    const comment = await commentModel.findById(id);

    return comment;
  }

  async updateComment(comment) {
    if (!comment._id) {
      throw new Error('ID is required');
    }

    const updatedComment = await commentModel.findByIdAndUpdate(comment._id, comment, { new: true });

    return updatedComment;
  }

  async deleteComment(id) {
    if (!id) {
      throw new Error('ID is required');
    }

    const comment = await commentModel.findByIdAndDelete(id);

    return comment;
  }
}

export default new CommentService();
