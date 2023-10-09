import { EventEmitter, Injectable, Output } from '@angular/core';
import { AppEvent } from '../enums/event';

@Injectable({
  providedIn: 'root',
})
export class EventDispatcherService {
  @Output() private eventsMap = new Map<string, EventEmitter<any>>();

  constructor() {
    Object.keys(AppEvent).forEach((appEvent) => {
      this.eventsMap.set(appEvent, new EventEmitter<any>());
    });
  }

  public getEvent(event: AppEvent) {
    return this.eventsMap.get(event);
  }

  public dispatch(event: AppEvent, body?: any) {
    this.getEvent(event)?.emit(body);
  }
}
