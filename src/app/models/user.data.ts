// TODO: put in separate files

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

// export interface UserData {
//   authUserId: string; // User UID
//   trips: Trip[];
// }
//
// export interface Trip {
//   tripName: string;
//   tripDescription?: string;
//   activities?: Activity[];
// }
//
// export interface Activity {
//   tripName: string;
//   activityName: string;
//   activityDescription?: string;
//   tag: 'travel' | 'accommodation' | 'tourism' | 'food';
//   notes?: string;
//   price: number; // type may change
//   startDate: number; // type may change
//   endDate: number; // type may change
//   startLocation?: string; // type may change
//   endLocation?: string; // type may change
// }
