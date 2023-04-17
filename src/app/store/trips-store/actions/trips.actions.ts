import {createAction, props} from '@ngrx/store';
import {Activity, Trip} from '../../../models/user.data';

// Trip CUD
export const addTrip = createAction(
  '[Trips] TRIPS Add Trip',
  props<{ trip: Trip; trips: Trip[] }>()
);

export const updateTrip = createAction(
  '[Trips] TRIPS Update Trip',
  props<{ oldTrip: Trip; newTrip: Trip; trips: Trip[] }>()
);

export const deleteTrip = createAction(
  '[Trips] TRIPS Delete Trip',
  props<{ trip: Trip; trips: Trip[] }>()
);

// R - 1 trip
export const loadTrip = createAction(
  '[Trips] TRIPS Load Trip',
  props<{ tripName: string }>()
);

export const loadTripSuccess = createAction(
  '[Trips] TRIPS Load Trip Success',
  props<{ trip: Trip }>()
);

export const loadTripFailure = createAction(
  '[Trips] TRIPS Load Trip Failure',
  props<{ error: string }>()
);

// R - all trips
export const loadTrips = createAction('[Trips] TRIPS Load Trips');

export const loadTripsSuccess = createAction(
  '[Trips] TRIPS Load Trips Success',
  props<{ trips: Trip[] }>()
);

export const loadTripsFailure = createAction(
  '[Trips] TRIPS Load Trips Failure',
  props<{ error: string }>()
);

// Activity CUD
export const addActivity = createAction(
  '[Trips] TRIPS Add Activity',
  props<{ activity: Activity; trips: Trip[] }>()
);

export const updateActivity = createAction(
  '[Trips] TRIPS Update Activity',
  props<{ newActivity: Activity; trips: Trip[] }>()
);

export const deleteActivity = createAction(
  '[Trips] TRIPS Delete Activity',
  props<{ activity: Activity; trips: Trip[] }>()
);

// R - 1 activity
export const loadActivity = createAction(
  '[Trips] TRIPS Load Activity',
  props<{ tripName: string; activityName: string }>()
);

export const loadActivitySuccess = createAction(
  '[Trips] TRIPS Load Activity Success',
  props<{ activity: Activity }>()
);

export const loadActivityFailure = createAction(
  '[Trips] TRIPS Load Activity Failure',
  props<{ error: string }>()
);

// R - all activities
export const loadActivities = createAction(
  '[Trips] TRIPS Load Activities',
  props<{ tripName: string }>()
);

export const loadActivitiesSuccess = createAction(
  '[Trips] TRIPS Load Activities Success',
  props<{ activities: Activity[] }>()
);

export const loadActivitiesFailure = createAction(
  '[Trips] TRIPS Load Activities Failure',
  props<{ error: string }>()
);
