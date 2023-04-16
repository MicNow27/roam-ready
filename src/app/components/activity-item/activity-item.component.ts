import { Component, Input } from '@angular/core';
import { Activity } from '../../models/user.data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent {
  @Input() activity: Activity | undefined;
  @Input() activityNameRoute = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  onActivityClick() {
    if (!this.activity) return;
    this.router.navigate([this.activityNameRoute], {
      relativeTo: this.route,
      queryParams: {
        tripName: this.activity.tripName,
        activityName: this.activity.activityName,
      },
    });
  }
}
