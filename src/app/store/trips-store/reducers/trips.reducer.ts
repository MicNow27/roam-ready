import { createFeature, createReducer, on } from '@ngrx/store';
import * as TripsActions from '../actions/trips.actions';

export const tripsFeatureKey = 'trips';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,
  on(TripsActions.tRIPSTripss, (state) => state),
  on(TripsActions.tRIPSTripssSuccess, (state, action) => state),
  on(TripsActions.tRIPSTripssFailure, (state, action) => state)
);

export const tripsFeature = createFeature({
  name: tripsFeatureKey,
  reducer,
});
