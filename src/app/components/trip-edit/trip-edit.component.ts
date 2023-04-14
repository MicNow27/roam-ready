import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../../services/trips/trips.service';
import { Activity, Trip } from '../../models/user.data';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-trip-item-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss'],
})
export class TripEditComponent implements OnInit {
  oldTrip: Trip | undefined;
  routeName = '';
  editMode = false;
  tripForm: FormGroup = new FormGroup({});
  activities: Activity[] | undefined;
  error: string | null = '';
  denied = false;

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    const tripName = this.route.snapshot.queryParamMap.get('tripName');
    if (tripName) {
      this.oldTrip = this.tripsService.getTrip(tripName);
      if (this.oldTrip) this.activities = this.oldTrip.activities;
      this.editMode = true;
    }

    this.initForm();
    // this.route.params.subscribe((params: Params) => {
    //   this.routeName = params['routeName'];
    //   if (this.routeName != null) {
    //     // this.oldTrip = this.tripsService.getTrip(this.routeName);
    //     if (this.oldTrip) this.activities = this.oldTrip.activities;
    //     this.editMode = true;
    //   }
    //   this.initForm();
    // });
  }

  async onSubmit() {
    if (this.editMode && this.oldTrip) {
      this.tripsService.updateTrip(this.oldTrip, this.tripForm.value);
    } else {
      this.tripsService.addTrip(this.tripForm.value);
    }
    await this.firestoreService.updateTrips(this.tripsService.getTrips());

    this.onCancel();
  }

  onCancel() {
    if (this.editMode)
      this.router.navigate(['../'], { relativeTo: this.route });
    else this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onAddActivity() {
    if (this.tripForm.dirty && !this.denied) {
      this.error = 'Do you want to proceed without saving?';
    }
    if (this.denied) {
      // TODO: route to activities new
      this.denied = false;
    }
  }

  onGoToActivities() {
    if (this.tripForm.dirty && !this.denied) {
      this.error = 'Do you want to proceed without saving?';
    }
    if (this.denied) {
      // TODO: route to activities
      this.denied = false;
    }
  }

  onHandleError() {
    this.error = null;
    this.denied = true;
  }

  private initForm() {
    let tripName = '';
    let tripDescription = '';

    if (this.editMode && this.oldTrip) {
      tripName = this.oldTrip.tripName;
      tripDescription = this.oldTrip.tripDescription || '';
    }

    this.tripForm = new FormGroup({
      tripName: new FormControl(tripName, Validators.required),
      tripDescription: new FormControl(tripDescription),
    });
  }
}
