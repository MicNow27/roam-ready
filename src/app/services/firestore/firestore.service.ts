import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { UserData } from '../../models/user.data';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  usersCollection: CollectionReference;
  users$: Observable<UserData[]>;
  private firestore: Firestore = inject(Firestore);

  constructor() {
    this.usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(this.usersCollection) as Observable<
      UserData[]
    >;
  }

  addUser(userData: UserData) {
    return from(
      addDoc(this.usersCollection, userData).then((docRef) => docRef.id)
    );
  }
}
