import { createFeature, createReducer, on } from '@ngrx/store';
import { Trip } from '../../../models/user.data';
import {
  addTrip,
  deleteTrip,
  loadTrips,
  loadTripsFailure,
  loadTripsSuccess,
  updateTrip,
} from '../actions/trips.actions';

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
  on(loadTrips, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadTripsSuccess, (state, { trips }) => ({
    ...state,
    trips: trips,
    status: 'success',
  })),
  on(loadTripsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);

export const tripsFeature = createFeature({
  name: tripsFeatureKey,
  reducer,
});
