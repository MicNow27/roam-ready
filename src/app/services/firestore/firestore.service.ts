import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { UserData } from '../../models/user.data';
import { User } from '@angular/fire/auth';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  usersCollection: CollectionReference;
  users$: Observable<UserData[]>;

  private firestore: Firestore = inject(Firestore);

  constructor(private userService: UserService) {
    this.usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(this.usersCollection) as Observable<
      UserData[]
    >;
  }

  async handleLoginSignup(user: User) {
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
        email: user.email,
        expiresIn: (await user.getIdTokenResult()).expirationTime,
        userId: user.uid,
        trips: [],
      };
      await this.addUser(userData);
    }
    this.userService.setUser(userData);
    return userData;
  }

  addUser(userData: UserData) {
    return from(
      addDoc(this.usersCollection, userData).then((docRef) => docRef.id)
    );
  }
}
