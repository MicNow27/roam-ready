import { Injectable } from '@angular/core';
import { Activity, Trip } from '../../models/user.data';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  tripsChanged = new Subject<Trip[]>();
  private trips: Trip[] = [];

  constructor() {}

  getTrips() {
    return this.trips.slice();
  }

  getTrip(tripName: string) {
    return this.trips.find((trip) => trip.tripName === tripName);
  }

  updateTrip(oldTrip: Trip, newTrip: Trip) {
    const tripIndex = this.getTripIndex(oldTrip.tripName);
    if (tripIndex >= 0) {
      this.trips[tripIndex] = newTrip;
      this.tripsChanged.next(this.trips.slice());
    }
  }

  addTrip(trip: Trip) {
    this.trips.push(trip);
    this.tripsChanged.next(this.trips.slice());
  }

  setTrips(trips: Trip[]) {
    this.trips = trips;
    this.tripsChanged.next(this.trips.slice());
  }

  deleteTrip(trip: Trip) {
    const tripIndex = this.getTripIndex(trip.tripName);
    if (tripIndex >= 0) {
      this.trips.splice(tripIndex, 1);
      this.tripsChanged.next(this.trips.slice());
    }
  }

  getActivitiesByTrip(tripName: string): Activity[] {
    const tripIndex = this.getTripIndex(tripName);
    if (tripIndex >= 0) {
      return this.trips[tripIndex].activities || [];
    }
    return [];
  }

  getActivityByTripAndActivity(tripName: string, activityName: string) {
    const activities = this.getActivitiesByTrip(tripName);
    return activities.find(
      (activity) => activity.activityName === activityName
    );
  }

  addActivityToTrip(activity: Activity) {
    const tripIndex = this.getTripIndex(activity.tripName);
    if (tripIndex < 0) return;

    if (!this.trips[tripIndex].activities) {
      this.trips[tripIndex].activities = [];
    }
    this.trips[tripIndex].activities!.push(activity);
    this.tripsChanged.next(this.trips.slice());
  }

  updateActivityInTrip(newActivity: Activity) {
    const tripIndex = this.getTripIndex(newActivity.tripName);
    if (tripIndex < 0) return;

    const currTrip = this.trips[tripIndex];
    if (!currTrip.activities) return;
    const activityIndex = this.getActivityIndex(
      currTrip.activities,
      newActivity.activityName
    );
    if (activityIndex < 0) return;

    currTrip.activities[activityIndex] = newActivity;
    this.tripsChanged.next(this.trips.slice());
  }

  private getTripIndex(tripName: string) {
    return this.trips.findIndex((trip) => trip.tripName === tripName);
  }

  private getActivityIndex(activities: Activity[], activityName: string) {
    return activities.findIndex(
      (activity) => activity.activityName === activityName
    );
  }
}
