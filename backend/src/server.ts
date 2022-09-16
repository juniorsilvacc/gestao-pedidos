import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import { PostgresDataSource } from './shared/infra/typeorm';
import { MongoDataSource } from './shared/infra/typeorm/index-mongo';

Promise.all([
  (PostgresDataSource.initialize(), MongoDataSource.initialize()),
]).then(() => {
  app.listen(process.env.PORT || 3333, () => {
    return console.log(`Server started on port ${process.env.PORT}! 🏆`);
  });
});
