import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { concatMap, map, Observable, of, take } from 'rxjs';
import { Trip } from '../../models/user.data';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Store } from '@ngrx/store';
import { selectTripsState } from '../../store/trips-store/selectors/trips.selectors';
import { loadTrips } from '../../store/trips-store/actions/trips.actions';

@Injectable({
  providedIn: 'root',
})
export class TripsResolver implements Resolve<Trip[]> {
  constructor(
    private firestoreService: FirestoreService,
    private store: Store
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Trip[]> | Promise<Trip[]> | Trip[] {
    this.store.dispatch(loadTrips());
    return this.store.select(selectTripsState).pipe(
      take(1),
      map((tripsState) => tripsState.trips),
      concatMap((trips) => {
        if (trips.length === 0) {
          return this.firestoreService.getTrips();
        } else {
          return of(trips);
        }
      })
    );

    // const trips = this.tripsService.getTrips();
    //
    // if (trips.length === 0) {
    //   return this.firestoreService.getTrips();
    // } else {
    //   return trips;
    // }
  }
}
