import { Request, Response } from 'express';
import { DatailOrderService } from '../../services/orders/DatailOrderService';

class DatailOrderController {
  async handle(request: Request, response: Response) {
    // const { order_id } = request.params;
    const order_id = request.query.order_id as string;

    const datailOrderService = new DatailOrderService();

    const orders = await datailOrderService.execute({ order_id });

    return response.status(200).json({ orders });
  }
}

export { DatailOrderController };
