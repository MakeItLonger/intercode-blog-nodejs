import Router from 'express';
import commentController from '../controllers/commentController.js';

const commentsRouter = new Router();

commentsRouter.post('/', commentController.createComment);
commentsRouter.get('/:postID', commentController.getAllComments);
commentsRouter.get('/comment/:id', commentController.getComment);
commentsRouter.put('/', commentController.updateComment);
commentsRouter.delete('/comment/:id', commentController.deleteComment);

export default commentsRouter;
