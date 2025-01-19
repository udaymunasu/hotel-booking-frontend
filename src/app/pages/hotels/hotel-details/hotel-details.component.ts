import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { DBRoomService } from 'src/app/service/db-server';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  hotelId: any ;
  hotelDetails: any; // Adjust the type according to your hotel data structure
  roomData$: Observable<any>; // Observable for room data

  selectedRoomTypes: any[] = [];
  isBookingFormVisible: boolean = false;
  bookingData: any = {
    name: '',
    email: '',
    date: '',
    roomType: ''
  };

  constructor( private route: ActivatedRoute, 
    // private hotelService: RoomService,
    private hotelService: DBRoomService,

  ) { }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id');
    console.log("this.hotelId ", this.hotelId )
    // Fetch hotel details
    this.hotelService.getHotelDetails(this.hotelId).subscribe((data) => {
      this.hotelDetails = data;
      console.log("this.hotelDetails", this.hotelDetails)
    });
    
    // Fetch room data (room service)
    this.roomData$ = this.hotelService.getHotelDetails(this.hotelId);
  }

  openBookingForm(room: any) {
    this.selectedRoomTypes = [room]; // Set the selected room for booking
    this.isBookingFormVisible = true; // Show the form
  }

  closeBookingForm() {
    this.isBookingFormVisible = false; // Hide the form
    this.bookingData = { name: '', email: '', date: '', roomType: '' }; // Clear form data
  }
  
  
  submitBooking() {
    const bookingDetails = {
      hotelId:  this.hotelId,
      roomType: this.bookingData.roomType,
      checkIn: this.bookingData.checkIn,
      checkOut: this.bookingData.checkOut,
      guests: this.bookingData.guests
    };

    console.log("bookingDetails", bookingDetails)

    this.hotelService.createBooking(bookingDetails).subscribe(
      response => {
        console.log('Booking successful', response);
        alert('Booking successful!');
        this.closeBookingForm(); // Close the form after submission
      },
      error => {
        console.error('Booking failed', error);
        alert('Booking failed! Please try again later.');
      }
    );
  }

}
