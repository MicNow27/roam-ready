import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Trip } from '../../models/user.data';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { TripsService } from '../../services/trips/trips.service';

@Injectable({
  providedIn: 'root',
})
export class TripsResolver implements Resolve<Trip[]> {
  constructor(
    private firestoreService: FirestoreService,
    private tripsService: TripsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Trip[]> | Promise<Trip[]> | Trip[] {
    const trips = this.tripsService.getTrips();

    if (trips.length === 0) {
      return this.firestoreService.getTrips();
    } else {
      return trips;
    }
  }
}
