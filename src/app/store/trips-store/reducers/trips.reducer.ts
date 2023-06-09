import { createFeature, createReducer, on } from '@ngrx/store';
import { Trip } from '../../../models/user.data';
import {
  addTrip,
  deleteTrip,
  loadTrip,
  loadTripFailure,
  loadTrips,
  loadTripsFailure,
  loadTripsSuccess,
  loadTripSuccess,
  updateTrip,
} from '../actions/trips.actions';

export const tripsFeatureKey = 'trips';

export interface State {
  trip: Trip | undefined;
  trips: Trip[];
  error: string | null;
  tripStatus: 'pending' | 'loading' | 'error' | 'success';
  tripsStatus: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: State = {
  trip: undefined,
  trips: [],
  error: null,
  tripStatus: 'pending',
  tripsStatus: 'pending',
};

export const reducer = createReducer(
  initialState,
  on(addTrip, (state, { trip }) => ({
    ...state,
    trips: [...state.trips, trip],
  })),
  on(updateTrip, (state, { oldTrip, newTrip }) => ({
    ...state,
    trips: state.trips.map((trip) => (trip === oldTrip ? newTrip : trip)),
  })),
  on(deleteTrip, (state, { trip }) => ({
    ...state,
    trips: state.trips.filter((t) => t !== trip),
  })),
  on(loadTrip, (state, { tripName }) => ({
    ...state,
    tripStatus: 'loading',
  })),
  on(loadTripSuccess, (state, { trip }) => ({
    ...state,
    trip: trip,
    tripStatus: 'success',
  })),
  on(loadTripFailure, (state, { error }) => ({
    ...state,
    error: error,
    tripStatus: 'error',
  })),
  on(loadTrips, (state) => ({
    ...state,
    tripsStatus: 'loading',
  })),
  on(loadTripsSuccess, (state, { trips }) => ({
    ...state,
    trips: trips,
    tripsStatus: 'success',
  })),
  on(loadTripsFailure, (state, { error }) => ({
    ...state,
    error: error,
    tripsStatus: 'error',
  }))
);

export const tripsFeature = createFeature({
  name: tripsFeatureKey,
  reducer,
});
