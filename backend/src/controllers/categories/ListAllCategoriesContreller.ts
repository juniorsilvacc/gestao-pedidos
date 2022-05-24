import { Request, Response } from 'express';
import { ListAllCategoriesService } from '../../services/categories/ListAllCategoriesService';

class ListAllCategoriesContreller {
  async handle(request: Request, response: Response) {
    const listcategoriesService = new ListAllCategoriesService();

    const categories = await listcategoriesService.execute();

    return response.status(200).json(categories);
  }
}

export { ListAllCategoriesContreller };
