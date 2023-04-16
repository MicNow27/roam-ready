import { createFeatureSelector } from '@ngrx/store';
import * as fromTrips from '../reducers/trips.reducer';

export const selectTripsState = createFeatureSelector<fromTrips.State>(
  fromTrips.tripsFeatureKey
);
