import { EventNotification, Notification, NotificationFeedEntry } from "./models";

export interface SbNotificationService {

  fetchNotificationList(): Promise<NotificationFeedEntry<Notification|any>[]>;

  handleNotificationClick(notificationData: EventNotification): void;

  deleteNotification(notificationData: EventNotification): Promise<boolean>;

  clearAllNotifications(notificationListData: EventNotification): Promise<boolean>;

}


