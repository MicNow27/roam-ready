import { createFeature, createReducer, on } from '@ngrx/store';
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
import { Activity } from '../../../models/user.data';

export const activitiesFeatureKey = 'activities';

export interface State {
  activity: Activity | undefined;
  activities: Activity[];
  error: string | null;
  activityStatus: 'pending' | 'loading' | 'error' | 'success';
  activitiesStatus: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: State = {
  activity: undefined,
  activities: [],
  error: null,
  activityStatus: 'pending',
  activitiesStatus: 'pending',
};

export const reducer = createReducer(
  initialState,
  on(addActivity, (state, { activity }) => ({
    ...state,
    activities: [...state.activities, activity],
  })),
  on(updateActivity, (state, { oldActivity, newActivity }) => ({
    ...state,
    activities: state.activities.map((activity) =>
      activity === oldActivity ? newActivity : activity
    ),
  })),
  on(deleteActivity, (state, { activity }) => ({
    ...state,
    activities: state.activities.filter((a) => a !== activity),
  })),
  on(loadActivity, (state, { tripName, activityName }) => ({
    ...state,
    activityStatus: 'loading',
  })),
  on(loadActivitySuccess, (state, { activity }) => ({
    ...state,
    activity: activity,
    activityStatus: 'success',
  })),
  on(loadActivityFailure, (state, { error }) => ({
    ...state,
    error: error,
    activityStatus: 'error',
  })),
  on(loadActivities, (state, { tripName }) => ({
    ...state,
    activitiesStatus: 'loading',
  })),
  on(loadActivitiesSuccess, (state, { activities }) => ({
    ...state,
    activities: activities,
    activitiesStatus: 'success',
  })),
  on(loadActivitiesFailure, (state, { error }) => ({
    ...state,
    error: error,
    activitiesStatus: 'error',
  }))
);

export const activitiesFeature = createFeature({
  name: activitiesFeatureKey,
  reducer,
});
