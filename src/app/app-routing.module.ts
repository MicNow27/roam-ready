import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TripsResolver } from './resolvers/trips/trips.resolver';
import { TripComponent } from './components/trip/trip.component';
import { ActivityComponent } from './components/activity/activity.component';

const routes: Routes = [
  {
    path: 'trips/edit/new',
    component: TripEditComponent,
  },
  {
    path: 'trips/edit/:tripNameRoute',
    component: TripEditComponent,
  },
  {
    path: 'trips/:tripNameRoute/:activityNameRoute',
    component: ActivityComponent,
  },
  {
    path: 'trips/:tripNameRoute',
    component: TripComponent,
  },
  {
    path: 'trips',
    component: TripsComponent,
    canActivate: [AuthGuard],
    resolve: [TripsResolver],
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
