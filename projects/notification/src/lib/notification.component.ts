import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationViewConfig, NotificationFeedEntry, Notification } from './models';
import { SbNotificationService } from './notification.service';
import { notificationViewConfig } from './notification-data';

@Component({
  selector: 'sb-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnChanges {

  @Input() notificationList: NotificationFeedEntry<Notification|any>[] = [];
  @Input() inAppNotificationConfig: NotificationViewConfig = notificationViewConfig;
  @Input() hideDeleteOption: boolean;

  @Output() notificationClick: EventEmitter<any> = new EventEmitter();
  @Output() deleteNotificationClick: EventEmitter<any> = new EventEmitter();
  @Output() clearAllClick: EventEmitter<any> = new EventEmitter();
  @Output() showMore: EventEmitter<any> = new EventEmitter();
  @Output() showLess: EventEmitter<any> = new EventEmitter();
  displayItemCount: number;

  constructor(
    @Inject('SB_NOTIFICATION_SERVICE') protected sbNotificationService: SbNotificationService
  ) { }

  ngOnInit() {
    this.displayItemCount = this.inAppNotificationConfig.minNotificationViewCount;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.notificationList) {
      this.notificationList = changes.notificationList.currentValue;
    }

    if (changes.inAppNotificationConfig) {
      this.inAppNotificationConfig = changes.inAppNotificationConfig.currentValue;
    }
  }

  notificationClickHandler(eventData) {
    this.notificationClick.emit(eventData);
  }

  notificationDeleteHandler(eventData) {
    this.deleteNotificationClick.emit(eventData);
  }

  clearAllNotifications(event) {
    const eventData = {
      event,
      data: this.notificationList
    };
    this.clearAllClick.emit(eventData);
    this.sbNotificationService.clearAllNotifications(eventData);
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
