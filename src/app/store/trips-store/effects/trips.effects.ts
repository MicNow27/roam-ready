import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  addTrip,
  deleteTrip,
  loadTrips,
  loadTripsFailure,
  loadTripsSuccess,
  updateTrip,
} from '../actions/trips.actions';
import { FirestoreService } from '../../../services/firestore/firestore.service';

@Injectable()
export class TripsEffects {
  loadTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTrips),
      switchMap(() =>
        this.firestoreService.getTrips().pipe(
          map((result) => loadTripsSuccess({ trips: result })),
          catchError((error) => of(loadTripsFailure({ error })))
        )
      )
    )
  );

  addTrip$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTrip),
        switchMap((action) => this.firestoreService.addTrip(action.trip))
      ),
    { dispatch: false }
  );

  updateTrip$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateTrip),
        switchMap((action) =>
          this.firestoreService.updateTrip(action.oldTrip, action.newTrip)
        )
      ),
    { dispatch: false }
  );

  deleteTrip$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteTrip),
        switchMap((action) => this.firestoreService.deleteTrip(action.trip))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private firestoreService: FirestoreService
  ) {}
}
