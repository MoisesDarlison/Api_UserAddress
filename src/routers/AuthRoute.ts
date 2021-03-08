import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const { auth } = new AuthController();
const authRouter = Router();

authRouter.post('/', auth);

export { authRouter };
