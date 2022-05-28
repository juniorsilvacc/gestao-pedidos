import { Request, Response } from 'express';
import { FindByOrderService } from '../../services/orders/FindByOrderService';

class FindByOrderController {
  async handle(request: Request, response: Response) {
    // const { order_id } = request.params;
    const order_id = request.query.order_id as string;

    const findByOrderService = new FindByOrderService();

    const orders = await findByOrderService.execute({ order_id });

    return response.status(200).json({ orders });
  }
}

export { FindByOrderController };
