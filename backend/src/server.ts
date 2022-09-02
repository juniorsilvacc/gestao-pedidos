import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import { dataSource } from './shared/infra/typeorm';

dataSource.initialize().then(() => {
  app.listen(process.env.PORT || 3333, () => {
    return console.log('Server started on port 3333! 🏆');
  });
});
