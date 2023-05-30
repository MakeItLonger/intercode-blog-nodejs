import mongoose from 'mongoose';

const commentModel = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  postID: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('comments', commentModel);
