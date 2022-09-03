import { NextFunction, Request, Response } from 'express';
import { PostgresUsersImplementations } from '../../../modules/users/repositories/implementations/postgres-users-implementations';
import { AppError } from '../../errors/app-error';

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const postgresUsersImplementations = new PostgresUsersImplementations();
  const user = await postgresUsersImplementations.findById(id);

  if (!user?.isAdmin) {
    throw new AppError('O usuário não é administrador');
  }

  return next();
}
