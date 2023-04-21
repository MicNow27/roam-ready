import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  authenticated$;

  constructor(private authService: AuthService, protected router: Router) {
    this.authenticated$ = this.authService.authState$;
  }

  onLogout() {
    this.authService.signOut();
  }
}
