import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateHotelComponent } from './pages/hotels/create-hotel/create-hotel.component';
import { EditHotelComponent } from './pages/hotels/edit-hotel/edit-hotel.component';
import { HotelDetailsComponent } from './pages/hotels/hotel-details/hotel-details.component';
import { HotelsComponent } from './pages/hotels/hotels/hotels.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { NewBookingComponent } from './pages/new-booking/new-booking.component';
import { BookingDetailsComponent } from './pages/booking-details/booking-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HotelResultsComponent } from './pages/hotel-results/hotel-results.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'all-hotels',
        component: HotelsComponent,
      },
      { path: 'edit-hotel/:id', component: EditHotelComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'createHotel',
        component: CreateHotelComponent,
      },
      { path: 'hotel-results', component: HotelResultsComponent },
      { path: 'bookings', component: BookingDetailsComponent },
      {
        path: 'newBooking',
        component: NewBookingComponent,
      },
      {
        path: 'bookings',
        component: BookingListComponent,
      },
      {
        path: 'userProfile',
        component: ProfileComponent,
      },
      { path: ':id', component: HotelDetailsComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
