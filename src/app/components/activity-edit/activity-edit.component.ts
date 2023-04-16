import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../../services/trips/trips.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { ActivitiesService } from '../../services/activities/activities.service';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss'],
})
export class ActivityEditComponent implements OnInit {
  oldActivity: Activity | undefined;
  editMode = false;
  activityForm: FormGroup = new FormGroup({});
  error = '';
  denied = false;

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private activitiesService: ActivitiesService,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    const activityName = this.route.snapshot.queryParamMap.get('activityName');
    if (activityName) {
      this.oldActivity = this.activitiesService.getActivity(activityName);
      this.editMode = true;
    }

    console.log('this.oldActivity', this.oldActivity);
    console.log('this.editMode', this.editMode);
    console.log('this.activityForm', activityName);

    this.initForm();
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }

  private initForm() {
    let activityName = '';
    let activityDescription = '';
    let notes = '';
    let tag;
    let startDate;
    let endDate;

    if (this.editMode && this.oldActivity) {
      activityName = this.oldActivity.activityName;
      activityDescription = this.oldActivity.activityDescription || '';
      notes = this.oldActivity.notes || '';
      tag = this.oldActivity.tag;
      startDate = this.oldActivity.startDate;
      endDate = this.oldActivity.endDate;
    }

    this.activityForm = new FormGroup({
      tripName: new FormControl(activityName, Validators.required),
      tripDescription: new FormControl(activityDescription),
      notes: new FormControl(notes),
      tag: new FormControl(tag, Validators.required),
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required),
    });
  }
}
