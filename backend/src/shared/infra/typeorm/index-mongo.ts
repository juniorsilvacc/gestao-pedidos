import { Notification } from '../../../modules/notifications/models/notification';
import { DataSource } from 'typeorm';

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'db_mongo_gestao_pedidos',
  useUnifiedTopology: true,
  entities: [Notification],
});
