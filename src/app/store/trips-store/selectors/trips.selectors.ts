import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrips from '../reducers/trips.reducer';

export const selectTripsState = createFeatureSelector<fromTrips.State>(
  fromTrips.tripsFeatureKey
);

export const selectTrip = createSelector(
  selectTripsState,
  (state) => state.trip
);

export const selectTripStatus = createSelector(
  selectTripsState,
  (state) => state.tripStatus
);

export const selectTrips = createSelector(
  selectTripsState,
  (state) => state.trips
);

export const selectTripsStatus = createSelector(
  selectTripsState,
  (state) => state.tripsStatus
);
