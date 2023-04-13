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

  calcTripStart() {
    let tripStart = new Date(this.activities[0].startDate);
    this.activities.forEach((activity) => {
      if (activity.startDate < tripStart) {
        tripStart = activity.startDate;
      }
    });
    return tripStart;
  }

  calcTripEnd() {
    let tripEnd = new Date(this.activities[0].endDate);
    this.activities.forEach((activity) => {
      if (activity.endDate > tripEnd) {
        tripEnd = activity.endDate;
      }
    });
    return tripEnd;
  }
}
