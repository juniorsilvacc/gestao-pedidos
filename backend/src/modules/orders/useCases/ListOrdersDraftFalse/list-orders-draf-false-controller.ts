import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListOrdersDraftFalseUseCase } from './list-orders-draf-false-usecase';

class ListOrdersDraftFalseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOrdersDraftFalseUseCase = container.resolve(
      ListOrdersDraftFalseUseCase,
    );

    const orders = await listOrdersDraftFalseUseCase.execute();

    return response.status(200).json(orders);
  }
}

export { ListOrdersDraftFalseController };
