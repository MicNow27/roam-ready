import { inject, Injectable } from '@angular/core';
import { catchError, from, Observable, switchMap } from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthResponseData } from '../../models/auth-response.data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUserId: string | undefined;
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);

  constructor(private router: Router) {
    this.authState$.subscribe((user) => {
      if (user) {
        this.authUserId = user.uid;
      }
    });
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
        throw this.handleError(error);
      })
    );
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }

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
