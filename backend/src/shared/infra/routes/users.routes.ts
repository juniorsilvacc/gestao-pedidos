import { Router } from 'express';
import { AuthenticateUserController } from '../../../modules/users/useCases/AuthenticateUser/authenticate-user-controller';
import { CreateUserController } from '../../../modules/users/useCases/CreateUser/create-user-controller';

const usersRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRouter.post('/register', createUserController.handle);
usersRouter.post('/login', authenticateUserController.handle);

export { usersRouter };
