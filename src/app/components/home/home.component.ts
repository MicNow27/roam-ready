import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  array = ['assets/images/castle.jpg', 'assets/images/skiing.jpg'];
  effect = 'scrollx';
}
