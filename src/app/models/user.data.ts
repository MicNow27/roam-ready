// TODO: put in separate files

export interface UserData {
  // idToken: string;
  // email: string;
  // expiresIn: string;
  authUserId: string; // User UID
  trips: Trip[];
}

export interface Trip {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  activities?: Activity[];
}

export interface Activity {
  tripName: string;
  activityName: string;
  description?: string;
  tag: string;
  notes?: string;
  price: string; // type may change
  startDate: Date; // type may change
  endDate: Date; // type may change
  startLocation?: string; // type may change
  endLocation?: string; // type may change
}
