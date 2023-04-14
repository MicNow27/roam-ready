// TODO: put in separate files

export interface UserData {
  authUserId: string; // User UID
  trips: Trip[];
}

export interface Trip {
  tripName: string;
  tripDescription?: string;
  activities?: Activity[];
}

export interface Activity {
  tripName: string;
  activityName: string;
  activityDescription?: string;
  tag: 'travel' | 'accommodation' | 'tourism' | 'food';
  notes?: string;
  price: number; // type may change
  startDate: number; // type may change
  endDate: number; // type may change
  startLocation?: string; // type may change
  endLocation?: string; // type may change
}
