import { Router } from 'express';
import { AuthUserController } from '../controllers/users/AuthUserController';
import { CreateUserController } from '../controllers/users/CreateUserController';
import { DetailUserController } from '../controllers/users/DetailUserController';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();

usersRouter.post('/register', createUserController.handle);
usersRouter.post('/login', authUserController.handle);
usersRouter.get('/details', ensureAutenticated, detailUserController.handle);

export { usersRouter };
