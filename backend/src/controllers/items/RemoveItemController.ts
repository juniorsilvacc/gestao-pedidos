import { Request, Response } from 'express';
import { RemoveItemService } from '../../services/items/RemoveItemService';

class RemoveItemController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const removeItemService = new RemoveItemService();

    await removeItemService.execute({ item_id: id });

    return response.status(204).json({});
  }
}

export { RemoveItemController };
