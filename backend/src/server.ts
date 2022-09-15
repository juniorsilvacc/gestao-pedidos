import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import { PostgresDataSource, MongoDataSource } from './shared/infra/typeorm';

Promise.all([
  (PostgresDataSource.initialize(), MongoDataSource.initialize()),
]).then(() => {
  app.listen(process.env.PORT || 3333, () => {
    return console.log(`Server started on port ${process.env.PORT}! 🏆`);
  });
});
