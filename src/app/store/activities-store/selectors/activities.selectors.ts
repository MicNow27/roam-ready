import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActivities from '../reducers/activities.reducer';

export const selectActivitiesState =
  createFeatureSelector<fromActivities.State>(
    fromActivities.activitiesFeatureKey
  );

export const selectActivity = createSelector(
  selectActivitiesState,
  (state) => state.activity
);

export const selectActivityStatus = createSelector(
  selectActivitiesState,
  (state) => state.activityStatus
);

export const selectActivities = createSelector(
  selectActivitiesState,
  (state) => state.activities
);

export const selectActivitiesStatus = createSelector(
  selectActivitiesState,
  (state) => state.activitiesStatus
);
