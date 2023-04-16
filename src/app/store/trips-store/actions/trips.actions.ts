import { createAction, props } from '@ngrx/store';
import { Activity, Trip } from '../../../models/user.data';

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

export const loadTrips = createAction('[Trips] TRIPS Load Trips');

export const loadTripsSuccess = createAction(
  '[Trips] TRIPS Load Trips Success',
  props<{ trips: Trip[] }>()
);

export const loadTripsFailure = createAction(
  '[Trips] TRIPS Load Trips Failure',
  props<{ error: string }>()
);

export const addActivity = createAction(
  '[Trips] TRIPS Add Activity',
  props<{ activity: Activity }>()
);

export const updateActivity = createAction(
  '[Trips] TRIPS Update Activity',
  props<{ newActivity: Activity }>()
);

export const deleteActivity = createAction(
  '[Trips] TRIPS Delete Activity',
  props<{ activity: Activity }>()
);

export const loadActivity = createAction(
  '[Trips] TRIPS Load Activity',
  props<{ tripName: string; activityName: string }>()
);

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
