import { ICreateNotificationDTO } from '../dtos/create-notification-dto';
import { Notification } from '../models/notification';

interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}

export { INotificationsRepository };
