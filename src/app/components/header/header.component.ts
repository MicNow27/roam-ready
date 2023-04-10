import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  authenticated$;

  constructor(private authService: AuthService) {
    this.authenticated$ = this.authService.authState$;
  }

  onLogout() {
    this.authService.signOut();
  }
}
