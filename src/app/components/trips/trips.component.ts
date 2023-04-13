import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../models/user.data';
import { Subscription } from 'rxjs';
import { TripsService } from '../../services/trips/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];
  tripsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tripsService: TripsService
  ) {}

  ngOnInit() {
    this.tripsSubscription = this.tripsService.tripsChanged.subscribe(
      (trips: Trip[]) => {
        this.trips = trips;
      }
    );
    this.trips = this.tripsService.getTrips();
    console.log('trips length: ' + this.trips.length);
  }

  tripName = (index: number, trip: { name: string }) => trip.name;

  onBeginClick() {
    console.log('onBeginClick');
    this.router.navigate(['edit/new'], { relativeTo: this.route });
  }
}
