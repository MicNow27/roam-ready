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
import { AuthResponseData } from '../../models/auth-response.data';

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

  constructor(private router: Router) {
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

  getAuthUserId() {
    return this.auth.currentUser?.uid;
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(
        async (userCredential) => await this.setAuthResponseData(userCredential)
      ),
      catchError((error) => {
        throw this.handleError(error);
      })
    );
  }

  signIn(email: string, password: string): Observable<AuthResponseData> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(
        async (userCredential) => await this.setAuthResponseData(userCredential)
      ),
      catchError((error) => {
        console.log('sign in ERROR');
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

  // private async setUserData(userCredential: UserCredential) {
  //   console.log('setUserData');
  //   const user = userCredential.user;
  //   return await this.firestoreService.handleLoginSignup(user);
  // }

  private async setAuthResponseData(userCredential: UserCredential) {
    const user = userCredential.user;
    const authData: AuthResponseData = {
      providerId: user.providerId,
      idToken: await user.getIdToken(),
      email: user.email,
      refreshToken: user.refreshToken,
      expiresIn: (await user.getIdTokenResult()).expirationTime,
      localId: user.uid,
      registered: true,
    };
    return authData;
  }

  private handleError(error: any) {
    console.log('Error CODE: ' + error.code); // TODO: remove later
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
