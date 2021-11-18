import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { notificationData } from './notification-card-data';
import { Notification, NotificationFeedEntry, NotificationStatus } from '../models';
import { SbNotificationService } from '../notification.service';

@Component({
  selector: 'sb-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnChanges {

  @Input() notification: NotificationFeedEntry<Notification | any> = notificationData;
  @Input() hideDeleteOption: boolean;

  @Output() notificationClick: EventEmitter<any> = new EventEmitter();
  @Output() deleteNotificationClick: EventEmitter<any> = new EventEmitter();
  NotificationStatus = NotificationStatus;

  constructor(
    @Inject('SB_NOTIFICATION_SERVICE') protected sbNotificationService: SbNotificationService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.notification) {
      this.notification = changes.notification.currentValue;
    }
  }

  notificationClickHandler(event) {
    const eventData = {
      event,
      data: this.notification
    };
    this.notificationClick.emit(eventData);
    this.sbNotificationService.handleNotificationClick(eventData);
  }

  notificationDeleteHandler(event) {
    const eventData = {
      event,
      data: this.notification
    };
    this.deleteNotificationClick.emit(eventData);
    this.sbNotificationService.deleteNotification(eventData);
  }

}