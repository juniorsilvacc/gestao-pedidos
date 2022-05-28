import { Request, Response } from 'express';
import { CreateOrderItemService } from '../../services/items/CreateOrderItemService';

class CreateOrderItemController {
  async handle(request: Request, response: Response) {
    const { amount, order_id, product_id } = request.body;

    const createOrderItemService = new CreateOrderItemService();

    const orderItem = await createOrderItemService.execute({
      amount,
      order_id,
      product_id,
    });

    return response.status(201).json({ orderItem });
  }
}

export { CreateOrderItemController };
