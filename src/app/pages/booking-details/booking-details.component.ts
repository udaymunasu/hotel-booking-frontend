import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBRoomService } from 'src/app/service/db-server';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
})
export class BookingDetailsComponent implements OnInit {
  bookings: any = null; // Store booking details
  errorMessage: string = ''; // Store error message if any

  constructor(
    private bookingService: DBRoomService,
    // private bookingService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the booking ID from the URL params
    const bookingId = JSON.parse(localStorage.getItem('hotelUser') || '{}');

    console.log('bookingId', bookingId);
    if (bookingId._id) {
      this.fetchBookingDetails(bookingId._id);
    }
  }

  // Method to fetch booking details by ID
  fetchBookingDetails(bookingId: string): void {
    this.bookingService.getBookingById(bookingId).subscribe(
      (data) => {
        this.bookings = data; ; // Store booking details in the component
        console.log("this.booking", this.bookings)
      },
      (error) => {
        this.errorMessage = error.message || 'Failed to fetch booking details.';
      }
    );
  }
}
