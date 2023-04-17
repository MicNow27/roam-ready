import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import {
  concatMap,
  defaultIfEmpty,
  map,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { Trip } from '../../models/user.data';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectTripsState } from '../../store/trips-store/selectors/trips.selectors';
import { loadTrips } from '../../store/trips-store/actions/trips.actions';

@Injectable({
  providedIn: 'root',
})
export class TripsResolver implements Resolve<Trip[]> {
  constructor(private store: Store, private actions: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Trip[]> | Promise<Trip[]> | Trip[] {
    return this.store.select(selectTripsState).pipe(
      take(1),
      map((tripsState) => tripsState.trips),
      concatMap((trips) => {
        if (trips.length === 0) {
          this.store.dispatch(loadTrips());
          const loadedTrips$ = this.actions.pipe(
            ofType(loadTrips),
            take(1),
            switchMap(() => this.store.select(selectTripsState)),
            map((tripsState) => tripsState.trips),
            take(1)
          );
          return loadedTrips$.pipe(defaultIfEmpty([]));
        } else {
          return of(trips);
        }
      })
    );
  }
}
