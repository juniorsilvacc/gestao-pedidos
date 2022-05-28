import { Request, Response } from 'express';
import { CloseOrderService } from '../../services/orders/CloseOrderService';

class CloseOrderController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const closeOrderService = new CloseOrderService();

    await closeOrderService.execute({ order_id: id });

    return response.status(204).json({});
  }
}

export { CloseOrderController };
