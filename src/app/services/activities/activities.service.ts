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

  getActivity(activityName: string) {
    // const activity: Activity = {
    //   tripName: 'Paris',
    //   activityName: 'Louvre',
    //   activityDescription: 'Day at the Louvre Museum',
    //   tag: 'tourism',
    //   notes: `We'll spend the day at the museum and have lunch somewhere nearby.`,
    //   price: 5,
    //   startDate: new Date('2020-01-01 08:00:00').getTime(),
    //   endDate: new Date('2020-01-01 17:00:00').getTime(),
    // };
    // return activity;
    return this.activities.find(
      (activity) => activity.activityName === activityName
    );
  }

  getActivitiesByTrip(tripName: string) {
    return this.activities.filter((activity) => activity.tripName === tripName);
  }

  setActivities(activities: Activity[]) {
    this.activities.push(...activities);
    this.activitiesChanged.next(this.activities.slice());
  }

  addActivity(activity: Activity) {
    this.activities.push(activity);
    this.activitiesChanged.next(this.activities.slice());
  }
}
