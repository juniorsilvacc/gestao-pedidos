import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/orders/CreateOrderService';

class CreateOrderController {
  async handle(request: Request, response: Response) {
    const { table, name } = request.body;

    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute({ table, name });

    return response.status(201).json({ order });
  }
}

export { CreateOrderController };
