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
  editMode = false;
  prompt = 'Add a new trip';
  tripForm: FormGroup = new FormGroup({});
  activities: Activity[] | undefined;
  error = '';
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
      // if (this.oldTrip) this.activities = this.oldTrip.activities;
      this.activities = [
        {
          tripName: 'Paris',
          activityName: 'Louvre',
          activityDescription: 'Day at the Louvre Museum',
          tag: 'tourism',
          notes: `We'll spend the day at the museum and have lunch somewhere nearby.`,
          price: 5.0,
          startDate: new Date('2020-01-01 08:00:00').getTime(),
          endDate: new Date('2020-01-01 17:00:00').getTime(),
        },
      ];
      this.editMode = true;
      this.prompt = 'Update your trip';
    }

    this.initForm();
  }

  async onSubmit() {
    if (this.editMode && this.oldTrip) {
      this.tripsService.updateTrip(this.oldTrip, this.tripForm.value);
    } else {
      this.tripsService.addTrip(this.tripForm.value);
    }
    await this.firestoreService.updateTrips(this.tripsService.getTrips());
    this.completeTripEdit();
  }

  onCancel() {
    if (this.tripForm.dirty && !this.denied) {
      this.error = 'Do you want to proceed without saving?';
      return;
    }
    this.denied = false;
    this.completeTripEdit();
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }

  private completeTripEdit() {
    if (this.editMode)
      this.router.navigate(['../'], { relativeTo: this.route });
    else this.router.navigate(['../../'], { relativeTo: this.route });
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
