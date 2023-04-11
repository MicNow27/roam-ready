import { Injectable } from '@angular/core';
import { Trip, UserData } from '../../models/user.data';
import { Subject } from 'rxjs';
import { ActivitiesService } from '../activities/activities.service';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  userChanged = new Subject<UserData>();
  tripsChanged = new Subject<Trip[]>();
  private user: UserData | undefined;
  private trips: Trip[] = [];

  constructor(private activitiesService: ActivitiesService) {}

  setUser(user: UserData) {
    console.log('setUser called');
    this.user = user;
    this.userChanged.next(this.user);
  }

  getUser() {
    return this.user;
  }

  getTrips() {
    return this.trips.slice();
  }

  getTrip(tripName: string) {
    return this.trips.find((trip) => trip.name === tripName);
  }

  updateTrip(oldTrip: Trip, newTrip: Trip) {
    const tripIndex = this.trips.findIndex(
      (trip) => trip.name === oldTrip.name
    );
    if (tripIndex >= 0) {
      this.trips[tripIndex] = newTrip;
      this.tripsChanged.next(this.trips.slice());
    }
  }

  addTrip(trip: Trip) {
    this.trips.push(trip);
    this.tripsChanged.next(this.trips.slice());
    console.log('addTrip ' + this.trips);
  }

  setTrips(trips: Trip[]) {
    console.log('setTrips called: ' + trips.length);
    this.trips = trips;
    this.tripsChanged.next(this.trips.slice());
    this.trips.forEach((trip) => {
      if (trip.activities) {
        this.activitiesService.addActivities(trip.activities);
      }
    });
  }
}
