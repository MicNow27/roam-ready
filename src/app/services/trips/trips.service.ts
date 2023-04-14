import { Injectable } from '@angular/core';
import { Trip } from '../../models/user.data';
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
    this.trips.forEach((trip) => {
      if (trip.activities) {
        this.activitiesService.addActivities(trip.activities);
      }
    });
  }
}
