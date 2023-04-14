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
  tag: string;
  notes?: string;
  price: string; // type may change
  startDate: Date; // type may change
  endDate: Date; // type may change
  startLocation?: string; // type may change
  endLocation?: string; // type may change
}
