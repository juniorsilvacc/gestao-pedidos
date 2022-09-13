import { Request, Response } from 'express';
import { PostgresOrdersImplementations } from '../../repositories/implementations/postgres-orders-implementations';
import { ListOrdersDraftFalseUseCase } from './list-orders-draf-false-usecase';

class ListOrdersDraftFalseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const ordersImplementations = new PostgresOrdersImplementations();
    const listOrdersDraftFalseUseCase = new ListOrdersDraftFalseUseCase(
      ordersImplementations,
    );

    const orders = await listOrdersDraftFalseUseCase.execute();

    return response.status(200).json(orders);
  }
}

export { ListOrdersDraftFalseController };