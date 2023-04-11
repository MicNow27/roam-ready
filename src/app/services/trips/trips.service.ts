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

  setTrips(trips: Trip[]) {
    this.trips = trips;
    this.tripsChanged.next(this.trips.slice());
    this.trips.forEach((trip) => {
      this.activitiesService.addActivities(trip.activities);
    });
  }
}
