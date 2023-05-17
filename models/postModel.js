import mongoose from 'mongoose';

const postModel = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  content: { type: String, required: true },
  picture: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('posts', postModel);
