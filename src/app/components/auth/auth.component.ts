import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserData } from '../../models/user.data';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) return;

    this.isLoading = true;

    let auth$: Observable<UserData>;
    if (this.isLoginMode) {
      auth$ = this.authService.signIn(
        authForm.value.email,
        authForm.value.password
      );
    } else {
      auth$ = this.authService.signUp(
        authForm.value.email,
        authForm.value.password
      );
    }
    auth$.subscribe(
      (result) => {
        console.log('RESULT: ' + JSON.stringify(result)); // TODO: remove later
        this.isLoading = false;
        this.router.navigate(['/trips']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    authForm.reset();
  }
}
