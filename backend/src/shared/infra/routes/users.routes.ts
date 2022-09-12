import { Router } from 'express';
import { AuthenticateUserController } from '../../../modules/users/useCases/AuthenticateUser/authenticate-user-controller';
import { CreateUserController } from '../../../modules/users/useCases/CreateUser/create-user-controller';
import { DetailsUserController } from '../../../modules/users/useCases/DetailsUser/details-user-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';

const usersRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const detailsUserController = new DetailsUserController();

usersRouter.post('/register', createUserController.handle);

usersRouter.post('/login', authenticateUserController.handle);

usersRouter.get('/details', ensureAuthenticate, detailsUserController.handle);

export { usersRouter };
