import { DataSource } from 'typeorm';
import { Category } from '../../../modules/categories/models/category';
import { User } from '../../../modules/users/models/user';
import { createUsers1662094766939 } from './migrations/1662094766939-create-users';
import { createCategories1662175000584 } from './migrations/1662175000584-create-categories';

// yarn typeorm migration:create src/shared/infra/typeorm/migrations/
// yarn typeorm -- -d ./src/shared/infra/typeorm/index.ts migration:run

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'db_gestao_pedidos',
  entities: [User, Category],
  migrations: [createUsers1662094766939, createCategories1662175000584],
});
