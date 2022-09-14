import { Router } from 'express';
import multer from 'multer';
import { AuthenticateUserController } from '../../../modules/users/useCases/AuthenticateUser/authenticate-user-controller';
import { CreateUserController } from '../../../modules/users/useCases/CreateUser/create-user-controller';
import { DetailsUserController } from '../../../modules/users/useCases/DetailsUser/details-user-controller';
import { UploadAvatarUserController } from '../../../modules/users/useCases/UploadAvatar/upload-avatar-user-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';
import uploadConfig from '../../../config/upload';
import ensureAdmin from '../middlewares/ensure-admin';

const usersRouter = Router();

const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const detailsUserController = new DetailsUserController();
const uploadAvatarUserController = new UploadAvatarUserController();

usersRouter.post('/login', authenticateUserController.handle);

usersRouter.post(
  '/register',
  ensureAuthenticate,
  ensureAdmin,
  createUserController.handle,
);

usersRouter.get('/details', ensureAuthenticate, detailsUserController.handle);

usersRouter.put(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  uploadAvatarUserController.handle,
);

export { usersRouter };
