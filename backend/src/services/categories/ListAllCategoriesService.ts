import prismaClient from '../../prisma';

class ListAllCategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany();

    return categories;
  }
}

export { ListAllCategoriesService };
