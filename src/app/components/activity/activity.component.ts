import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from '../../services/activities/activities.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  activity: Activity | undefined;

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
}
