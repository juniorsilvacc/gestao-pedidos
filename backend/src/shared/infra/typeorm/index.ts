import { DataSource } from 'typeorm';
import { User } from '../../../modules/users/models/user';
import { createUsers1662094766939 } from './migrations/1662094766939-create-users';

// yarn typeorm migration:create src/shared/infra/typeorm/migrations/

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'db_gestao_pedidos',
  entities: [User],
  migrations: [createUsers1662094766939],
});
