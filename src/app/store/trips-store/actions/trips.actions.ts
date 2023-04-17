import { createAction, props } from '@ngrx/store';
import { Trip } from '../../../models/user.data';

export const addTrip = createAction(
  '[Trips] TRIPS Add Trip',
  props<{ trip: Trip }>()
);

export const updateTrip = createAction(
  '[Trips] TRIPS Update Trip',
  props<{ oldTrip: Trip; newTrip: Trip }>()
);

export const deleteTrip = createAction(
  '[Trips] TRIPS Delete Trip',
  props<{ trip: Trip }>()
);

export const loadTrip = createAction(
  '[Trips] TRIPS Load Trip',
  props<{ tripName: string }>()
);

export const loadTripSuccess = createAction(
  '[Trips] TRIPS Load Trip Success',
  props<{ trip: Trip | undefined }>()
);

export const loadTripFailure = createAction(
  '[Trips] TRIPS Load Trip Failure',
  props<{ error: string }>()
);

export const loadTrips = createAction('[Trips] TRIPS Load Trips');

export const loadTripsSuccess = createAction(
  '[Trips] TRIPS Load Trips Success',
  props<{ trips: Trip[] }>()
);

export const loadTripsFailure = createAction(
  '[Trips] TRIPS Load Trips Failure',
  props<{ error: string }>()
);
