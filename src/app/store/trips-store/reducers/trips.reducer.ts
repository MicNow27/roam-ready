import { createFeature, createReducer, on } from '@ngrx/store';
import {
  addActivity,
  addTrip,
  deleteActivity,
  deleteTrip,
  loadActivities,
  loadActivitiesFailure,
  loadActivitiesSuccess,
  loadActivity,
  loadActivityFailure,
  loadActivitySuccess,
  loadTrip,
  loadTripFailure,
  loadTrips,
  loadTripsFailure,
  loadTripsSuccess,
  loadTripSuccess,
  updateActivity,
  updateTrip,
} from '../actions/trips.actions';
import { Trip } from '../../../models/user.data';

export const tripsFeatureKey = 'trips';

export interface State {
  trips: Trip[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: State = {
  trips: [],
  error: null,
  status: 'pending',
};

export const reducer = createReducer(
  initialState,

  // Trip CUD
  on(addTrip, (state, {trip}) => ({
    ...state,
    trips: [...state.trips, trip],
  })),
  on(updateTrip, (state, {oldTrip, newTrip}) => ({
    ...state,
    trips: state.trips.map((trip) => {
      return trip === oldTrip ? newTrip : trip;
    }),
  })),
  on(deleteTrip, (state, {trip}) => ({
    ...state,
    trips: state.trips.filter((t) => t !== trip),
  })),

  // R - 1 trip
  on(loadTrip, (state, {tripName}) => ({
    ...state,
    status: 'loading',
  })),
  on(loadTripSuccess, (state, {trip}) => ({
    ...state,
    trips: [...state.trips, trip],
    status: 'success',
  })),
  on(loadTripFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // R - all trips
  on(loadTrips, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadTripsSuccess, (state, {trips}) => ({
    ...state,
    trips: trips,
    status: 'success',
  })),
  on(loadTripsFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // Activity CUD
  on(addActivity, (state, {activity}) => ({
    ...state,
    trips: state.trips.map((trip) => {
      if (trip.tripName === activity.tripName) {
        return {
          ...trip,
          activities: trip.activities
            ? [...trip.activities, activity]
            : [activity],
        };
      }
      return trip;
    }),
  })),
  on(updateActivity, (state, {newActivity}) => ({
    ...state,
    trips: state.trips.map((trip) => {
      if (trip.tripName === newActivity.tripName) {
        return {
          ...trip,
          activities: trip.activities
            ? trip.activities.map((activity) => {
              return activity === newActivity ? newActivity : activity;
            })
            : [newActivity],
        };
      }
      return trip;
    }),
  })),
  on(deleteActivity, (state, {activity}) => ({
    ...state,
    trips: state.trips.map((trip) => {
      if (trip.tripName === activity.tripName) {
        return {
          ...trip,
          activities: trip.activities
            ? trip.activities.filter((a) => a !== activity)
            : [],
        };
      }
      return trip;
    }),
  })),

  // R - 1 activity
  on(loadActivity, (state, {tripName, activityName}) => ({
    ...state,
    status: 'loading',
  })),
  on(loadActivitySuccess, (state, {activity}) => ({
    ...state,
    trips: state.trips.map((trip) => {
      if (trip.tripName === activity.tripName) {
        return {
          ...trip,
          activities: trip.activities
            ? [...trip.activities, activity]
            : [activity],
        };
      }
      return trip;
    }),
    status: 'success',
  })),
  on(loadActivityFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // R - all activities
  on(loadActivities, (state, {tripName}) => ({
    ...state,
    status: 'loading',
  })),
  on(loadActivitiesSuccess, (state, {activities}) => ({
    ...state,
    trips: state.trips.map((trip) => {
      return {
        ...trip,
        activities: activities.filter(
          (activity) => activity.tripName === trip.tripName
        ),
      };
    }),
    status: 'success',
  })),
  on(loadActivitiesFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);

export const tripsFeature = createFeature({
  name: tripsFeatureKey,
  reducer,
});
