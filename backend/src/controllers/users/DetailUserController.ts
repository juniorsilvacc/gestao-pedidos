import { Request, Response } from 'express';
import { DetailUserService } from '../../services/users/DetailUserService';

class DetailUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const detailUserService = new DetailUserService();

    const user = await detailUserService.execute({ id });

    return response.json(user);
  }
}

export { DetailUserController };
