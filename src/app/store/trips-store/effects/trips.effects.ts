import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as TripsActions from '../actions/trips.actions';

@Injectable()
export class TripsEffects {
  tRIPSTripss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripsActions.tRIPSTripss),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) => TripsActions.tRIPSTripssSuccess({ data })),
          catchError((error) => of(TripsActions.tRIPSTripssFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
