import { Injectable } from '@angular/core';
import { Activity, Trip } from '../../models/user.data';
import { Subject } from 'rxjs';
import { ActivitiesService } from '../activities/activities.service';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  tripsChanged = new Subject<Trip[]>();
  private trips: Trip[] = [];

  constructor(private activitiesService: ActivitiesService) {}

  getTrips() {
    return this.trips.slice();
  }

  getTrip(tripName: string) {
    return this.trips.find((trip) => trip.tripName === tripName);
  }

  updateTrip(oldTrip: Trip, newTrip: Trip) {
    const tripIndex = this.trips.findIndex(
      (trip) => trip.tripName === oldTrip.tripName
    );
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
    // this.trips.forEach((trip) => {
    //   if (trip.activities) {
    //     this.activitiesService.setActivities(trip.activities);
    //   }
    // });
  }

  deleteTrip(trip: Trip) {
    const tripIndex = this.trips.findIndex(
      (tripItem) => tripItem.tripName === trip.tripName
    );
    if (tripIndex >= 0) {
      this.trips.splice(tripIndex, 1);
      this.tripsChanged.next(this.trips.slice());
    }
  }

  getActivitiesByTrip(tripName: string): Activity[] {
    const tripIndex = this.trips.findIndex(
      (trip) => trip.tripName === tripName
    );
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
    console.log('addActivityToTrip');
    const tripIndex = this.trips.findIndex(
      (trip) => trip.tripName === activity.tripName
    );
    if (tripIndex >= 0) {
      console.log('tripIndex', tripIndex);
      if (!this.trips[tripIndex].activities) {
        this.trips[tripIndex].activities = [];
        console.log(
          '1 this.trips[tripIndex].activities',
          this.trips[tripIndex].activities
        );
      }
      this.trips[tripIndex].activities!.push(activity);
      this.tripsChanged.next(this.trips.slice());
      console.log(
        '2 this.trips[tripIndex].activities',
        this.trips[tripIndex].activities
      );
    }
  }
}
