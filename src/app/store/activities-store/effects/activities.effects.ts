import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  addActivity,
  deleteActivity,
  loadActivities,
  loadActivitiesFailure,
  loadActivitiesSuccess,
  loadActivity,
  loadActivityFailure,
  loadActivitySuccess,
  updateActivity,
} from '../actions/activities.actions';
import { FirestoreService } from '../../../services/firestore/firestore.service';

@Injectable()
export class ActivitiesEffects {
  loadActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActivities),
      switchMap((action) =>
        this.firestoreService.getActivities(action.tripName).pipe(
          map((result) => loadActivitiesSuccess({ activities: result })),
          catchError((error) => of(loadActivitiesFailure({ error })))
        )
      )
    )
  );

  loadActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActivity),
      switchMap((action) =>
        this.firestoreService
          .getActivity(action.tripName, action.activityName)
          .pipe(
            map((result) => loadActivitySuccess({ activity: result })),
            catchError((error) => of(loadActivityFailure({ error })))
          )
      )
    )
  );

  addActivity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addActivity),
        switchMap((action) =>
          this.firestoreService.addActivity(action.activity)
        )
      ),
    { dispatch: false }
  );

  updateActivity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateActivity),
        switchMap((action) =>
          this.firestoreService.updateActivity(
            action.oldActivity,
            action.newActivity
          )
        )
      ),
    { dispatch: false }
  );

  deleteActivity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteActivity),
        switchMap((action) =>
          this.firestoreService.deleteActivity(action.activity)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private firestoreService: FirestoreService
  ) {}
}
