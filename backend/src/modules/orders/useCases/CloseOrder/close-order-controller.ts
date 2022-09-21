import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CloseOrderUseCase } from './close-order-usecase';

class CloseOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const closeOrderUseCase = container.resolve(CloseOrderUseCase);

    await closeOrderUseCase.execute({ id });

    return response.status(204).json();
  }
}

export { CloseOrderController };
