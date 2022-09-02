import { Router } from 'express';
import { CreateUserController } from '../../../modules/users/useCases/CreateUser/create-user-controller';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/register', createUserController.handle);

export { usersRouter };
