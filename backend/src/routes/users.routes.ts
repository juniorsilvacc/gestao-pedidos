import { Router } from 'express';
import { CreateUserController } from '../controllers/users/CreateUserController';

const usersRouter = Router();

usersRouter.post('/register', new CreateUserController().handle);

export { usersRouter };
