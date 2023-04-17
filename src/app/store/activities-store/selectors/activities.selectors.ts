import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActivities from '../reducers/activities.reducer';

export const selectActivitiesState =
  createFeatureSelector<fromActivities.State>(
    fromActivities.activitiesFeatureKey
  );

export const selectActivities = createSelector(
  selectActivitiesState,
  (state) => state.activities
);

export const selectActivity = createSelector(
  selectActivitiesState,
  (state) => state.activity
);

export const selectTripStatus = createSelector(
  selectActivitiesState,
  (state) => state.status
);
