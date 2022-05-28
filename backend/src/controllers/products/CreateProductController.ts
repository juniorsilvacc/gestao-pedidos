import { Request, Response } from 'express';
import { AppError } from '../../config/errors/AppError';
import { CreateProductService } from '../../services/products/CreateProductService';

class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, price, description, category_id } = request.body;

    const createProductService = new CreateProductService();

    if (!request.file) {
      throw new AppError('Error: upload image');
    } else {
      const { filename: banner } = request.file;

      const product = await createProductService.execute({
        name,
        price,
        description,
        banner,
        category_id,
      });

      return response.status(201).json({ product });
    }
  }
}

export { CreateProductController };
