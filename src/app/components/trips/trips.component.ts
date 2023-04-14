import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../models/user.data';
import { Subscription } from 'rxjs';
import { TripsService } from '../../services/trips/trips.service';
import { tripNameRoute } from '../../../utils/routeNames';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];
  tripsSubscription: Subscription | undefined;
  tripNameRoute = tripNameRoute;

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
  }

  tripName = (index: number, trip: { tripName: string }) => trip.tripName;

  onBeginClick() {
    this.onAddTrip();
  }

  onAddTrip() {
    this.router.navigate(['edit/new'], { relativeTo: this.route });
  }
}
