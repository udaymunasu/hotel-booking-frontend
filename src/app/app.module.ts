import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookingDetailsComponent } from './pages/booking-details/booking-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateHotelComponent } from './pages/hotels/create-hotel/create-hotel.component';
import { EditHotelComponent } from './pages/hotels/edit-hotel/edit-hotel.component';
import { HotelDetailsComponent } from './pages/hotels/hotel-details/hotel-details.component';
import { HotelsComponent } from './pages/hotels/hotels/hotels.component';
import { NewBookingComponent } from './pages/new-booking/new-booking.component';
import { CustomCardComponent } from './components/custom-card/custom-card.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { HotelResultsComponent } from './pages/hotel-results/hotel-results.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    BookingListComponent,
    DashboardComponent,
    LayoutComponent,
    NewBookingComponent,
    RegisterComponent,
    CreateHotelComponent,
    HotelDetailsComponent,
    BookingDetailsComponent,
    EditHotelComponent,
    HotelsComponent,
    ImageCarouselComponent,
    CustomCardComponent,
    ProfileComponent,
    HotelResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
