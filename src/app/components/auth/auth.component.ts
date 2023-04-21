import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;
  error: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) return;

    let auth$: Observable<string>;
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
        this.router.navigate(['/trips']);
      },
      (errorMessage) => {
        this.error = errorMessage;
      }
    );

    authForm.reset();
  }
}
