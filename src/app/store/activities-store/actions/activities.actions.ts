import { createAction, props } from '@ngrx/store';
import { Activity } from '../../../models/user.data';

export const addActivity = createAction(
  '[Activities] ACTS Add Activity',
  props<{ activity: Activity }>()
);

export const updateActivity = createAction(
  '[Activities] ACTS Update Activity',
  props<{ oldActivity: Activity; newActivity: Activity }>()
);

export const deleteActivity = createAction(
  '[Activities] ACTS Delete Activity',
  props<{ activity: Activity }>()
);

export const loadActivities = createAction(
  '[Activities] ACTS Load Activities',
  props<{ tripName: string }>()
);

export const loadActivitiesSuccess = createAction(
  '[Activities] ACTS Load Activities Success',
  props<{ activities: Activity[] }>()
);

export const loadActivitiesFailure = createAction(
  '[Activities] ACTS Load Activities Failure',
  props<{ error: string }>()
);
