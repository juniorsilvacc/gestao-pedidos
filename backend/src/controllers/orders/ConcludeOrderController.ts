import { Request, Response } from 'express';
import { ConcludeOrderService } from '../../services/orders/ConcludeOrderService';

class ConcludeOrderController {
  async handle(request: Request, response: Response) {
    const { order_id } = request.body;

    const concludeOrderService = new ConcludeOrderService();

    const concludeOrder = await concludeOrderService.execute({ order_id });

    return response.status(200).json({ concludeOrder });
  }
}

export { ConcludeOrderController };
