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
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: State = {
  activity: undefined,
  activities: [],
  error: null,
  status: 'pending',
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
    status: 'loading',
  })),
  on(loadActivitySuccess, (state, { activity }) => ({
    ...state,
    activity: activity,
    status: 'success',
  })),
  on(loadActivityFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(loadActivities, (state, { tripName }) => ({
    ...state,
    status: 'loading',
  })),
  on(loadActivitiesSuccess, (state, { activities }) => ({
    ...state,
    activities: activities,
    status: 'success',
  })),
  on(loadActivitiesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);

export const activitiesFeature = createFeature({
  name: activitiesFeatureKey,
  reducer,
});
