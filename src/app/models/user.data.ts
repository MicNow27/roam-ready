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
  name: string;
  description?: string;
  tag: string;
  notes?: string;
  price: string;
  startDate: string;
  endDate: string;
  startLocation?: string;
  endLocation?: string;
}
