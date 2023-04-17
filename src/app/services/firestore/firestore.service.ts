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
import { Observable } from 'rxjs';
import { Trip, UserData } from '../../models/user.data';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  usersCollection: CollectionReference;
  users$: Observable<UserData[]>;

  private firestore: Firestore = inject(Firestore);

  constructor(private authService: AuthService) {
    this.usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(this.usersCollection) as Observable<
      UserData[]
    >;
  }

  async getTrips(): Promise<Trip[]> {
    const authUserId = this.authService.authUserId;
    if (!authUserId) return [];

    if ((await this.getUserCollId(authUserId)) === '')
      await this.addUser(authUserId);

    const querySnapshot = await this.getQuerySnapshot(authUserId);

    let trips: Trip[] = [];
    querySnapshot.forEach((docElement: any) => {
      trips = docElement.data().trips;
    });

    return trips;
  }

  async updateTrips(trips: Trip[]) {
    const authUserId = this.authService.authUserId;
    if (!authUserId) return; // Should never be the case.

    const userCollId = await this.getUserCollId(authUserId);
    if (userCollId === '') return; // Should never be the case.

    await updateDoc(doc(this.firestore, 'users', userCollId), {
      authUserId: authUserId,
      trips: trips,
    });
  }

  private async getUserCollId(authUserId: string) {
    const querySnapshot = await this.getQuerySnapshot(authUserId);

    let userCollId = '';
    querySnapshot.forEach((docElement: any) => {
      userCollId = docElement.id;
    });

    return userCollId;
  }

  private async getQuerySnapshot(authUserId: string) {
    return await getDocs(
      query(this.usersCollection, where('authUserId', '==', authUserId))
    );
  }

  private async addUser(authUserId: string) {
    const userData: UserData = {
      authUserId: authUserId,
      trips: [],
    };
    const docRef = await addDoc(this.usersCollection, userData);
    return docRef.id;
  }
}
