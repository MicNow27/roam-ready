import { Component, Input } from '@angular/core';
import { Trip } from '../../models/user.data';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent {
  @Input() trip: Trip | undefined;
  @Input() routeName = '';
}
