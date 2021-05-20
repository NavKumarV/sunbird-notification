import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { NotificationViewConfig, NotificationFeedEntry, NotificationData } from './models';
import { AbstractNotificationService } from './abstract-notification.service';
import { notificationViewConfig } from './notification-data';

@Component({
  selector: 'sb-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() notificationList: NotificationFeedEntry<NotificationData|any>[] = [];
  @Input() inAppNotificationConfig: NotificationViewConfig = notificationViewConfig;
  @Output() showMore: EventEmitter<any> = new EventEmitter();
  @Output() showLess: EventEmitter<any> = new EventEmitter();
  displayItemCount: number;

  constructor(
    @Inject('NOTIFICATION_SERVICE') protected notificationService: AbstractNotificationService
  ) { }

  ngOnInit() {
    this.displayItemCount = this.inAppNotificationConfig.minNotificationViewCount;
  }

  clearAllNotifications(event) {
    const eventData = {
      event,
      data: this.notificationList
    };
    this.notificationService.clearAllNotifications(eventData);
  }

  onShowMore() {
    this.showMore.emit(true);
    if (this.notificationList.length) {
      this.displayItemCount = this.notificationList.length;
    }
  }

  onShowLess() {
    this.showLess.emit(true);
    this.displayItemCount = this.inAppNotificationConfig.minNotificationViewCount;
  }

}