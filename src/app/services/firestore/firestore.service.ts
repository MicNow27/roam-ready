import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Trip, UserData } from '../../models/user.data';
import { User } from '@angular/fire/auth';
import { TripsService } from '../trips/trips.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  usersCollection: CollectionReference;
  users$: Observable<UserData[]>;

  private firestore: Firestore = inject(Firestore);

  constructor(private tripsService: TripsService) {
    this.usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(this.usersCollection) as Observable<
      UserData[]
    >;
  }

  async handleLoginSignup(user: User) {
    console.log('handleLoginSignup called');
    const userId = user.uid;
    const querySnapShot = await getDocs(
      query(this.usersCollection, where('userId', '==', userId))
    );

    let userData: UserData | undefined;
    querySnapShot.forEach((docElement) => {
      userData = docElement.data() as UserData;
    });

    if (!userData) {
      userData = {
        idToken: await user.getIdToken(),
        email: user.email ?? '',
        expiresIn: (await user.getIdTokenResult()).expirationTime,
        userId: user.uid,
        trips: [],
      };
      await this.addUser(userData);
    }
    // this.tripsService.setUser(userData);
    // this.tripsService.setTrips(userData.trips);
    console.log(
      'userData: ',
      userData.userId,
      userData.trips.length,
      userData.email,
      userData.expiresIn,
      userData.idToken
    );
    return userData;
  }

  async getTrips(): Promise<Trip[]> {
    const user = this.tripsService.getUser()!;
    const userCollId = await this.getUserCollId(user);

    const querySnapshot = await getDocs(
      query(this.usersCollection, where('userId', '==', user.userId))
    );

    let trips: Trip[] = [];
    querySnapshot.forEach((docElement: any) => {
      trips = docElement.data().trips;
    });

    this.tripsService.setTrips(trips);

    return trips;
  }

  async updateTrips(user: UserData, trips: Trip[]) {
    console.log('updateTrips called');
    console.log('trips: ', trips.length);

    const userCollId = await this.getUserCollId(user);
    console.log('userCollId: ', userCollId);

    await updateDoc(doc(this.firestore, 'users', userCollId), {
      idToken: user.idToken,
      email: user.email,
      expiresIn: user.expiresIn,
      userId: user.userId,
      trips: trips,
    });
  }

  private async getUserCollId(user: UserData): Promise<string> {
    const querySnapshot = await getDocs(
      query(this.usersCollection, where('userId', '==', user.userId))
    );

    let userCollId = '';
    querySnapshot.forEach((docElement: any) => {
      userCollId = docElement.id;
    });
    console.log('userCollId: ', userCollId);

    return userCollId;
  }

  private addUser(userData: UserData) {
    return from(
      addDoc(this.usersCollection, userData).then((docRef) => docRef.id)
    );
  }
}
