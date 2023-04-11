export interface UserData {
  idToken: string;
  email: string | null;
  expiresIn: string;
  userId: string;
  trips: Trip[];
}

export interface Trip {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
}

export interface Activity {
  tripName: string;
  activityName: string;
  description?: string;
  tag: string;
  notes?: string;
  price: string; // type may change
  startDate: string; // type may change
  endDate: string; // type may change
  startLocation?: string; // type may change
  endLocation?: string; // type may change
}
