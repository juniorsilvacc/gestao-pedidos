import { MongoRepository } from 'typeorm';
import { MongoDataSource } from '../../../../shared/infra/typeorm';
import { ICreateNotificationDTO } from '../../dtos/create-notification-dto';
import { Notification } from '../../models/notification';
import { INotificationsRepository } from '../notifications-repository';

class MongoNotificationImplementations implements INotificationsRepository {
  private repository: MongoRepository<Notification>;

  constructor() {
    this.repository = MongoDataSource.getMongoRepository(Notification);
  }

  async create({
    content,
    order_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.repository.create({ content, order_id });

    await this.repository.save(notification);

    return notification;
  }
}

export { MongoNotificationImplementations };
