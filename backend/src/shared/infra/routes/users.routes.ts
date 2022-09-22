import { Router } from 'express';
import multer from 'multer';
import { AuthenticateUserController } from '../../../modules/users/useCases/AuthenticateUser/authenticate-user-controller';
import { CreateUserController } from '../../../modules/users/useCases/CreateUser/create-user-controller';
import { CreateUserAdminController } from '../../../modules/users/useCases/CreateAdmin/create-user-admin-controller';
import { DetailsUserController } from '../../../modules/users/useCases/DetailsUser/details-user-controller';
import { UploadAvatarUserController } from '../../../modules/users/useCases/UploadAvatar/upload-avatar-user-controller';
import ensureAuthenticate from '../middlewares/ensure-authenticate';
import uploadConfig from '../../../config/upload';
import ensureAdmin from '../middlewares/ensure-admin';

import {
  authenticationValidation,
  registerValidation,
} from '../validations/users-validations';

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

const createUserController = new CreateUserController();
const createUserAdminController = new CreateUserAdminController();
const authenticateUserController = new AuthenticateUserController();
const detailsUserController = new DetailsUserController();
const uploadAvatarUserController = new UploadAvatarUserController();

usersRouter.post(
  '/login',
  authenticationValidation,
  authenticateUserController.handle,
);

usersRouter.post(
  '/register',
  ensureAuthenticate,
  ensureAdmin,
  registerValidation,
  createUserController.handle,
);

usersRouter.post(
  '/register/admin',
  registerValidation,
  createUserAdminController.handle,
);

usersRouter.get('/details', ensureAuthenticate, detailsUserController.handle);

usersRouter.put(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  uploadAvatarUserController.handle,
);

export { usersRouter };
