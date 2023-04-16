import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../../services/trips/trips.service';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss'],
})
export class ActivityEditComponent implements OnInit {
  tripName: string | undefined;
  oldActivity: Activity | undefined;
  editMode = false;
  prompt = 'Add a new activity';
  activityForm: FormGroup = new FormGroup({});
  error = '';
  denied = false;
  tag = 'travel';
  currencySymbol = 'R';

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    const tripName = this.route.snapshot.queryParamMap.get('tripName');
    if (!tripName) return;
    this.tripName = tripName;

    const activityName = this.route.snapshot.queryParamMap.get('activityName');
    if (activityName) {
      this.oldActivity = this.tripsService.getActivityByTripAndActivity(
        this.tripName,
        activityName
      );
      this.editMode = true;
      this.prompt = 'Update your activity';
      if (this.oldActivity) this.tag = this.oldActivity.tag;
    }

    this.initForm();
  }

  async onSubmit() {
    if (!this.tripName) return;
    const activity: Activity = {
      tripName: this.tripName,
      activityName: this.activityForm.value.activityName,
      activityDescription: this.activityForm.value.activityDescription,
      tag: this.activityForm.value.tag,
      notes: this.activityForm.value.notes,
      startDate: this.activityForm.value.startDate.getTime(),
      endDate: this.activityForm.value.endDate.getTime(),
      price: this.activityForm.value.price,
    };

    if (this.editMode && this.oldActivity) {
      this.tripsService.updateActivityInTrip(activity);
    } else {
      this.tripsService.addActivityToTrip(activity);
    }
    await this.firestoreService.updateTrips(this.tripsService.getTrips());
    this.completeActivityEdit();
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }

  onCancel() {
    if (this.activityForm.dirty && !this.denied) {
      this.error = 'Do you want to proceed without saving?';
      return;
    }
    this.denied = false;
    this.completeActivityEdit();
  }

  private completeActivityEdit() {
    if (this.editMode)
      this.router.navigate(['../'], { relativeTo: this.route });
    else this.router.navigate(['../../'], { relativeTo: this.route });
  }

  private initForm() {
    let activityName = '';
    let activityDescription = '';
    let notes = '';
    let tag = this.tag;
    let startDate;
    let endDate;
    let price = 0;

    if (this.editMode && this.oldActivity) {
      activityName = this.oldActivity.activityName;
      activityDescription = this.oldActivity.activityDescription || '';
      notes = this.oldActivity.notes || '';
      tag = this.oldActivity.tag;
      startDate = new Date(this.oldActivity.startDate);
      endDate = new Date(this.oldActivity.endDate);
      price = this.oldActivity.price;
    }

    this.activityForm = new FormGroup({
      activityName: new FormControl(activityName, Validators.required),
      activityDescription: new FormControl(activityDescription),
      notes: new FormControl(notes),
      tag: new FormControl(tag, Validators.required),
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required),
      price: new FormControl(price, Validators.required),
    });
  }
}
