export interface Trip {
  authUserId: string; // User UID
  tripName: string;
  tripDescription?: string;
}

export interface Activity {
  authUserId: string; // User UID
  tripName: string;
  activityName: string;
  activityDescription?: string;
  tag: 'travel' | 'accommodation' | 'tourism' | 'food';
  notes?: string;
  price: number;
  startDate: number;
  endDate: number;
}
