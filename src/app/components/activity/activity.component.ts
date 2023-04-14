import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from '../../services/activities/activities.service';
import { activityNameRoute } from '../../../utils/routeNames';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  activity: Activity | undefined;
  activityNameRoute = activityNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit() {
    const activityName = this.route.snapshot.queryParamMap.get('activityName');
    if (activityName)
      this.activity = this.activitiesService.getActivity(activityName);
  }

  onEditActivity() {
    if (!this.activity) return;
    const activityNameRoute = this.activityNameRoute(this.activity);
    this.router.navigate(['../edit', activityNameRoute], {
      relativeTo: this.route,
      queryParams: { activityName: this.activity.activityName },
    });
  }
}
