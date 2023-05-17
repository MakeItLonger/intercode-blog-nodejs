import Router from 'express';
import postController from '../controllers/postController.js';

const postsRouter = new Router();

postsRouter.post('/', postController.createPost);
postsRouter.get('/', postController.getAllPosts);
postsRouter.get('/:id', postController.getPost);
postsRouter.put('/', postController.updatePost);
postsRouter.delete('/:id', postController.deletePost);

export default postsRouter;
