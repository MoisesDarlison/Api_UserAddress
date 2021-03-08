import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { AuthMid } from '../middlewares/AuthMid'

const { create, index, destroy, update, filter } = new UserController();
const { verifyJWT } = new AuthMid();
const userRouter = Router();

userRouter.post('/', create);
userRouter.get('/list', verifyJWT, index);
userRouter.get('/', verifyJWT, filter);
userRouter.put('/', verifyJWT, update);
userRouter.delete('/', verifyJWT, destroy);

export { userRouter };

