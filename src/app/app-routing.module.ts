import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TripComponent } from './components/trip/trip.component';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivityEditComponent } from './components/activity-edit/activity-edit.component';

const routes: Routes = [
  {
    path: 'trips/:tripName/edit/new',
    component: ActivityEditComponent,
  },
  {
    path: 'trips/:tripName/edit/:activityName',
    component: ActivityEditComponent,
  },
  {
    path: 'trips/edit/new',
    component: TripEditComponent,
  },
  {
    path: 'trips/edit/:tripName',
    component: TripEditComponent,
  },
  {
    path: 'trips/:tripName/:activityName',
    component: ActivityComponent,
  },
  {
    path: 'trips/:tripName',
    component: TripComponent,
  },
  {
    path: 'trips',
    component: TripsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
