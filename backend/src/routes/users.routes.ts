import { Router } from 'express';
import { AuthUserController } from '../controllers/users/AuthUserController';
import { CreateUserController } from '../controllers/users/CreateUserController';
import { DetailUserController } from '../controllers/users/DetailUserController';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const usersRouter = Router();

usersRouter.post('/register', new CreateUserController().handle);
usersRouter.post('/login', new AuthUserController().handle);

usersRouter.get(
  '/details',
  ensureAutenticated,
  new DetailUserController().handle,
);

export { usersRouter };
