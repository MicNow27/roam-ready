export const activityNameRoute = (activity: { activityName: string }) =>
  activity.activityName.toLowerCase().replace(/ /g, '-');

export const tripNameRoute = (trip: { tripName: string }) =>
  trip.tripName.toLowerCase().replace(/ /g, '-');
