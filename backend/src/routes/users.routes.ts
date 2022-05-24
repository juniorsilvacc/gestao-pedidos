import { Router } from 'express';
import { AuthUserController } from '../controllers/users/AuthUserController';
import { CreateUserController } from '../controllers/users/CreateUserController';

const usersRouter = Router();

usersRouter.post('/register', new CreateUserController().handle);
usersRouter.post('/login', new AuthUserController().handle);

export { usersRouter };
