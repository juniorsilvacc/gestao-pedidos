import { Request, Response } from 'express';
import { ListAllOrderNotDraftService } from '../../services/orders/ListAllOrderNotDraftService';

class ListAllOrderNotDraftController {
  async handle(request: Request, response: Response) {
    const listAllOrderNotDraftService = new ListAllOrderNotDraftService();

    const listOrder = await listAllOrderNotDraftService.execute();

    return response.status(200).json(listOrder);
  }
}

export { ListAllOrderNotDraftController };
