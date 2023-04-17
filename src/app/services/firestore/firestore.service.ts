import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { from, map, Observable, switchMap } from 'rxjs';
import { Activity, Trip } from '../../models/user.data';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  tripsCollection: CollectionReference;
  trips$: Observable<Trip[]>;
  activitiesCollection: CollectionReference;
  activities$: Observable<Activity[]>;

  private firestore: Firestore = inject(Firestore);

  constructor(private authService: AuthService) {
    this.tripsCollection = collection(this.firestore, 'trips');
    this.trips$ = collectionData(this.tripsCollection) as Observable<Trip[]>;
    this.activitiesCollection = collection(this.firestore, 'activities');
    this.activities$ = collectionData(this.activitiesCollection) as Observable<
      Activity[]
    >;
  }

  getTrips(): Observable<Trip[]> {
    const authUserId = this.authService.authUserId;
    return this.trips$.pipe(
      map((response: Trip[]) => {
        return response.filter((trip: Trip) => trip.authUserId === authUserId);
      })
    );
  }

  getTrip(authUserId: string, tripName: string): Observable<Trip | undefined> {
    return this.trips$.pipe(
      map((response: Trip[]) => {
        return response.find(
          (trip: Trip) =>
            trip.authUserId === authUserId && trip.tripName === tripName
        );
      })
    );
  }

  getActivities(tripName: string): Observable<Activity[]> {
    const authUserId = this.authService.authUserId;
    return this.activities$.pipe(
      map((response: Activity[]) => {
        return response.filter(
          (activity: Activity) =>
            activity.authUserId === authUserId && activity.tripName === tripName
        );
      })
    );
  }

  getActivity(
    authUserId: string,
    tripName: string,
    activityName: string
  ): Observable<Activity | undefined> {
    return this.activities$.pipe(
      map((response: Activity[]) => {
        return response.find(
          (activity: Activity) =>
            activity.authUserId === authUserId &&
            activity.tripName === tripName &&
            activity.activityName === activityName
        );
      })
    );
  }

  addTrip(trip: Trip) {
    return from(addDoc(this.tripsCollection, trip).then((docRef) => docRef.id));
  }

  addActivity(activity: Activity) {
    return from(
      addDoc(this.activitiesCollection, activity).then((docRef) => docRef.id)
    );
  }

  updateTrip(trip: Trip, tripUpdate: Trip) {
    return from(this.getTripId(trip)).pipe(
      switchMap((tripId) =>
        updateDoc(doc(this.firestore, 'trips', tripId), {
          authUserId: tripUpdate.authUserId,
          tripName: tripUpdate.tripName,
          tripDescription: tripUpdate.tripDescription,
        })
      )
    );
  }

  updateActivity(activity: Activity, activityUpdate: Activity) {
    return from(this.getActivityId(activity)).pipe(
      switchMap((activityId) =>
        updateDoc(doc(this.firestore, 'activities', activityId), {
          authUserId: activityUpdate.authUserId,
          tripName: activityUpdate.tripName,
          activityName: activityUpdate.activityName,
          activityDescription: activityUpdate.activityDescription,
          tag: activityUpdate.tag,
          notes: activityUpdate.notes,
          startDate: activityUpdate.startDate,
          endDate: activityUpdate.endDate,
        })
      )
    );
  }

  deleteTrip(trip: Trip) {
    return from(this.getTripId(trip)).pipe(
      switchMap((tripId) => {
        return deleteDoc(doc(this.firestore, 'trips', tripId)).then(() =>
          this.deleteActivities(trip)
        );
      })
    );
  }

  deleteActivity(activity: Activity) {
    return from(this.getActivityId(activity)).pipe(
      switchMap((activityId) =>
        deleteDoc(doc(this.firestore, 'activities', activityId))
      )
    );
  }

  private async deleteActivities(trip: Trip) {
    const querySnapshot = await getDocs(
      query(this.activitiesCollection, where('tripName', '==', trip.tripName))
    );

    querySnapshot.forEach(
      async (docElement: any) =>
        await deleteDoc(doc(this.firestore, 'activities', docElement.id))
    );
  }

  private async getTripId(trip: Trip): Promise<string> {
    const querySnapshot = await getDocs(
      query(this.tripsCollection, where('tripName', '==', trip.tripName))
    );

    let tripId = '';
    querySnapshot.forEach((docElement: any) => {
      tripId = docElement.id;
    });

    return tripId;
  }

  private async getActivityId(activity: Activity): Promise<string> {
    const querySnapshot = await getDocs(
      query(
        this.activitiesCollection,
        where('activityName', '==', activity.activityName)
      )
    );

    let activityId = '';
    querySnapshot.forEach((docElement: any) => {
      activityId = docElement.id;
    });

    return activityId;
  }

  // async updateTrips(trips: Trip[]) {
  //   const authUserId = this.authService.authUserId;
  //   if (!authUserId) return; // Should never be the case.
  //
  //   const userCollId = await this.getUserCollId(authUserId);
  //   if (userCollId === '') return; // Should never be the case.
  //
  //   await updateDoc(doc(this.firestore, 'users', userCollId), {
  //     authUserId: authUserId,
  //     trips: trips,
  //   });
  // }

  // async getTrips(): Promise<Trip[]> {
  //   // Get this user's UID.
  //   const authUserId = this.authService.authUserId;
  //   if (!authUserId) return []; // Should never be the case.
  //
  //   // Check if the user exists in the Firestore collection.
  //   // If not, create a new user document.
  //   if ((await this.getUserCollId(authUserId)) === '')
  //     await this.addUser(authUserId);
  //
  //   // Get the document in the users Firestore collection containing authUserId.
  //   const querySnapshot = await this.getQuerySnapshot(authUserId);
  //
  //   // Get the trips array from the document.
  //   let trips: Trip[] = [];
  //   querySnapshot.forEach((docElement: any) => {
  //     trips = docElement.data().trips;
  //   });
  //
  //   this.tripsService.setTrips(trips);
  //
  //   return trips;
  // }

  // private async getUserCollId(authUserId: string) {
  //   const querySnapshot = await this.getQuerySnapshot(authUserId);
  //
  //   let userCollId = '';
  //   querySnapshot.forEach((docElement: any) => {
  //     userCollId = docElement.id;
  //   });
  //
  //   return userCollId;
  // }

  // private async getQuerySnapshot(authUserId: string) {
  //   return await getDocs(
  //     query(this.usersCollection, where('authUserId', '==', authUserId))
  //   );
  // }

  // private async addUser(authUserId: string) {
  //   const userData: UserData = {
  //     authUserId: authUserId,
  //     trips: [],
  //   };
  //   const docRef = await addDoc(this.usersCollection, userData);
  //   return docRef.id;
  // }
}
