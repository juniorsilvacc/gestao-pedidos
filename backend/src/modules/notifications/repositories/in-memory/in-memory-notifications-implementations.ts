import { ICreateNotificationDTO } from '../../dtos/create-notification-dto';
import { Notification } from '../../models/notification';
import { INotificationsRepository } from '../notifications-repository';

class InMemoryNotificationsImplementations implements INotificationsRepository {
  private notifications: Notification[] = [];

  async create({
    content,
    order_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      content,
      order_id,
    });

    this.notifications.push(notification);

    return notification;
  }
}

export { InMemoryNotificationsImplementations };
