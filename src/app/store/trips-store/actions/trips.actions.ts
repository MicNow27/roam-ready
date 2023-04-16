import { createAction, props } from '@ngrx/store';

export const tRIPSTripss = createAction(
  '[Trips] TRIPS Tripss'
);

export const tRIPSTripssSuccess = createAction(
  '[Trips] TRIPS Tripss Success',
  props<{ data: any }>()
);

export const tRIPSTripssFailure = createAction(
  '[Trips] TRIPS Tripss Failure',
  props<{ error: any }>()
);
