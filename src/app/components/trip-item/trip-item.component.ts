import { Component, Input } from '@angular/core';
import { Trip } from '../../models/user.data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-item',
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.scss'],
})
export class TripItemComponent {
  @Input() trip: Trip | undefined;
  @Input() tripName = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  onTripClick() {
    if (!this.trip) return;
    this.router.navigate([this.tripName], {
      relativeTo: this.route,
    });
  }
}
