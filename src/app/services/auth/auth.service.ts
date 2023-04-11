import { inject, Injectable } from '@angular/core';
import { catchError, from, Observable, Subscription, switchMap } from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  idToken,
  signInWithEmailAndPassword,
  user,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserData } from '../../models/user.data';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription: Subscription;
  authStateSubscription: Subscription;
  idTokenSubscription: Subscription;
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  authState$ = authState(this.auth);
  idToken$ = idToken(this.auth);

  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    // TODO: THESE MUST BE UNSUBSCRIBED FROM (see docs OnDestroy in component)!!!!

    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      console.log('User in userSubscription is: ' + aUser); // TODO: remove later
      if (!aUser) {
        this.router.navigate(['/home']);
      }
    });

    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        console.log('User in authStateSubscription is: ' + aUser); // TODO: remove later
        if (!aUser) {
          this.router.navigate(['/home']);
        }
      }
    );

    this.idTokenSubscription = this.idToken$.subscribe(
      (token: string | null) => {
        console.log('Token in idTokenSubscription is: ' + token); // TODO: remove later
        if (!token) {
          this.router.navigate(['/home']);
        }
      }
    );
  }

  signUp(email: string, password: string): Observable<UserData> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(
        async (userCredential) => await this.setUserData(userCredential)
      ),
      catchError((error) => {
        throw this.handleError(error);
      })
    );
  }

  signIn(email: string, password: string): Observable<UserData> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(async (userCredential) => {
        return await this.setUserData(userCredential);
      }),
      catchError((error) => {
        throw this.handleError(error);
      })
    );
  }

  signOut() {
    this.auth.signOut().then(() => {
      console.log('Signed out'); // TODO: remove later
    });
    this.router.navigate(['/auth']);
    // TODO: unsubscribe from subscriptions here?
  }

  private async setUserData(userCredential: UserCredential) {
    const user = userCredential.user;
    return await this.firestoreService.handleLoginSignup(user);
  }

  private handleError(error: any) {
    console.log('Error CODE: ' + error.code);
    let errorMessage = 'An unknown error occurred!';
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email exists already!';
        break;
      case 'auth/user-not-found':
        errorMessage = 'User not found!';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Username or password is incorrect!';
    }
    return errorMessage;
  }
}
