import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map } from 'rxjs/operators';
import { from, of, switchMap } from 'rxjs';
import {
  addActivity,
  addTrip,
  deleteTrip,
  loadActivity,
  loadActivityFailure,
  loadActivitySuccess,
  loadTrip,
  loadTripFailure,
  loadTrips,
  loadTripsFailure,
  loadTripsSuccess,
  loadTripSuccess,
  updateActivity,
  updateTrip,
} from '../actions/trips.actions';
import { FirestoreService } from '../../../services/firestore/firestore.service';

@Injectable()
export class TripsEffects {
  addTrip$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTrip),
        switchMap((action) =>
          from(this.firestoreService.updateTrips(action.trips))
        )
      ),
    { dispatch: false }
  );

  updateTrip$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateTrip),
        switchMap((action) =>
          from(this.firestoreService.updateTrips(action.trips))
        )
      ),
    { dispatch: false }
  );

  deleteTrip$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteTrip),
        switchMap((action) =>
          from(this.firestoreService.updateTrips(action.trips))
        )
      ),
    { dispatch: false }
  );

  loadTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTrip),
      switchMap((action) =>
        from(this.firestoreService.getTrips()).pipe(
          map((result) => {
            const trip = result.find(
              (trip) => trip.tripName === action.tripName
            );
            if (trip) return loadTripSuccess({ trip: trip });
            else return loadTripFailure({ error: 'Trip not found' });
          })
        )
      )
    )
  );

  loadTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTrips),
      switchMap(() =>
        from(this.firestoreService.getTrips()).pipe(
          map((result) => loadTripsSuccess({ trips: result })),
          catchError((error) => of(loadTripsFailure({ error })))
        )
      )
    )
  );

  addActivity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addActivity),
        switchMap((action) =>
          from(this.firestoreService.updateTrips(action.trips))
        )
      ),
    { dispatch: false }
  );

  updateActivity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateActivity),
        switchMap((action) =>
          from(this.firestoreService.updateTrips(action.trips))
        )
      ),
    { dispatch: false }
  );

  deleteActivity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteTrip),
        switchMap((action) =>
          from(this.firestoreService.updateTrips(action.trips))
        )
      ),
    { dispatch: false }
  );

  loadActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActivity),
      switchMap((action) =>
        from(this.firestoreService.getTrips()).pipe(
          map((result) => {
            const trip = result.find(
              (trip) => trip.tripName === action.tripName
            );
            if (!trip) return loadActivityFailure({ error: 'Trip not found' });
            if (!trip.activities)
              return loadActivityFailure({ error: 'Trip has no activities' });
            const activity = trip.activities.find(
              (activity) => activity.activityName === action.activityName
            );
            if (activity) return loadActivitySuccess({ activity: activity });
            else return loadActivityFailure({ error: 'Activity not found' });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private firestoreService: FirestoreService
  ) {}
}
