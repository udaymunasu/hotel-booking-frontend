import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBRoomService } from 'src/app/service/db-server';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  hotels: any[] = [];
  editingHotel: any = null;
  filteredHotels: any;

  searchText: string = '';  // Variable to bind with the search input


  constructor(private hotelService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this.fetchHotels();
    this.filterHotels()
  }

  fetchHotels(): void {
    this.hotelService.getAllHotels().subscribe((data: any[]) => {
      this.hotels = data; // Assign API data to hotels
      this.filteredHotels = data; // Initially show all hotels
    },
    (error) => {
      console.error('Error fetching hotels data', error);
    
    });
  }

  filterHotels() {
    this.filteredHotels = this.hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(this.searchText.toLowerCase()) || 
      hotel.location.toLowerCase().includes(this.searchText.toLowerCase()) ||
      hotel.amenities.some((amenity: any) => amenity.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  onSearchChange(): void {
    this.filterHotels();
  }

  // Watch for changes in searchText and call filterHotels method
  ngOnChanges() {
    this.filterHotels();
  }

  isImageArray(images: any): boolean {
    return Array.isArray(images);
  }

  startEditing(hotel: any): void {
    this.editingHotel = { ...hotel };
  }

  saveChanges(): void {
    if (this.editingHotel) {
      this.hotelService
        .updateHotel(this.editingHotel.id, this.editingHotel)
        .subscribe(() => {
          this.fetchHotels();
          this.editingHotel = null;
        });
    }
  }


  onEditClick(hotel: any): void {
    console.log("hotel", hotel)
    // Navigate to the edit page with the hotel ID
    this.router.navigate(['/edit-hotel', hotel._id]);
  }
}
