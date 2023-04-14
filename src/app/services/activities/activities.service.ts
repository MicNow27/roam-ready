import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Activity } from '../../models/user.data';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  activitiesChanged = new Subject<Activity[]>();
  private activities: Activity[] = [];

  constructor() {}

  getActivitiesByTrip(tripName: string) {
    return this.activities.filter((activity) => activity.tripName === tripName);
  }

  addActivities(activities: Activity[]) {
    this.activities.push(...activities);
    this.activitiesChanged.next(this.activities.slice());
  }
}
