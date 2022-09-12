import { Request, Response } from 'express';
import { PostgresItemsImplementations } from '../../../items/repositories/implementations/postgres-items-implementations';
import { ListOrderItemDetailsUseCase } from './list-order-item-details-usecase';

class ListOrderItemDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const order_id = request.query.order_id as string;

    const itemsImplementations = new PostgresItemsImplementations();
    const listOrderItemDetailsController = new ListOrderItemDetailsUseCase(
      itemsImplementations,
    );

    const orders = await listOrderItemDetailsController.execute({ order_id });

    return response.status(200).json(orders);
  }
}

export { ListOrderItemDetailsController };
