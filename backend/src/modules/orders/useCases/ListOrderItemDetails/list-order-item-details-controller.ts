import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListOrderItemDetailsUseCase } from './list-order-item-details-usecase';

class ListOrderItemDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const order_id = request.query.order_id as string;

    const listOrderItemDetails = container.resolve(ListOrderItemDetailsUseCase);

    const orders = await listOrderItemDetails.execute({ order_id });

    return response.status(200).json(orders);
  }
}

export { ListOrderItemDetailsController };
