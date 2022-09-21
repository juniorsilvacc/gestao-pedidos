import { container } from 'tsyringe';

import { ICategoriesRespository } from '../../modules/categories/repositories/categories-repository';
import { PostgresCategoriesImplementations } from '../../modules/categories/repositories/implementations/postgres-categories-implementations';
import { PostgresItemsImplementations } from '../../modules/items/repositories/implementations/postgres-items-implementations';
import { IItemsRepository } from '../../modules/items/repositories/items-repository';
import { MongoNotificationImplementations } from '../../modules/notifications/repositories/implementations/mongo-notifications-implementations';
import { INotificationsRepository } from '../../modules/notifications/repositories/notifications-repository';
import { PostgresOrdersImplementations } from '../../modules/orders/repositories/implementations/postgres-orders-implementations';
import { IOrdersRepository } from '../../modules/orders/repositories/orders-repository';
import { PostgresProductsImplementations } from '../../modules/products/repositories/implementations/postgres-products-implementations';
import { IProductsRepository } from '../../modules/products/repositories/products-repository';
import { PostgresUsersImplementations } from '../../modules/users/repositories/implementations/postgres-users-implementations';
import { IUsersRepository } from '../../modules/users/repositories/users-repository';
import '../providers';

container.registerSingleton<ICategoriesRespository>(
  'CategoriesRepository',
  PostgresCategoriesImplementations,
);

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  PostgresItemsImplementations,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  MongoNotificationImplementations,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  PostgresOrdersImplementations,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  PostgresProductsImplementations,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PostgresUsersImplementations,
);
