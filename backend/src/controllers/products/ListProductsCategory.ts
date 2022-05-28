import { Request, Response } from 'express';
import { ListProductsService } from '../../services/products/ListProductsService';

class ListProductsCategory {
  async handle(request: Request, response: Response) {
    // const category_id = request.query.category_id as string;
    const { id } = request.params;

    const listProductsService = new ListProductsService();

    const products = await listProductsService.execute({ category_id: id });

    return response.status(200).json({ products });
  }
}

export { ListProductsCategory };
