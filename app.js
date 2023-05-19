import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postsRouter from './routes/postsRouter.js';

import cors from 'cors';

dotenv.config();

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api/posts', postsRouter);

// app.get('/', async (req, res) => {
//   console.log(req.body);
// });

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
