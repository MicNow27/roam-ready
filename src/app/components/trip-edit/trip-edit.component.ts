import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TripsService } from '../../services/trips/trips.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activity } from '../../models/user.data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss'],
})
export class TripEditComponent implements OnInit {
  editMode = false;
  tripForm: FormGroup = new FormGroup({});
  tripName: string = '';
  activities: Activity[] = [];
  activitiesSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private router: Router,
    private activitiesService: ActivitiesService
  ) {}

  get activitiesControls() {
    return (this.tripForm.get('activities') as FormArray).controls;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tripName = params['tripName'];
      this.editMode = params['tripName'] != null;
      this.initForm();
    });

    this.activitiesSubscription =
      this.activitiesService.activitiesChanged.subscribe(
        (activities: Activity[]) => {
          this.activities = this.activitiesService.getActivitiesByTrip(
            this.tripName
          ); // TODO: Eh?
        }
      );
    this.activities = this.activitiesService.getActivitiesByTrip(this.tripName);
  }

  onSubmit() {}

  onCancel() {}

  onAddActivity() {}

  onSaveActivity() {}

  onDeleteActivity() {}

  private initForm() {}
}
