import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DBRoomService } from 'src/app/service/db-server';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.scss'],
})
export class EditHotelComponent implements OnInit {
  hotelForm!: FormGroup;
  hotelId!: string;
  amenitiesList = ['Free Wi-Fi', 'Swimming Pool', 'Gym', 'Spa', 'Restaurant'];
  selectedImages: string[] = [];
  roomTypes = this.fb.array([]);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // private hotelService: DBRoomService
    private hotelService: RoomService
  ) {}

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadHotelData();
  }

  initForm() {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      city: [''],
      pricePerNight: [0, Validators.required],
      amenities: [[]],
      images: [[]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      roomTypes: this.fb.array([]),
      featured: [false],
      contact: this.fb.group({
        phone: [''],
        email: [''],
      }),
      checkInTime: [''],
      checkOutTime: [''],
    });
  }

  addRoomType() {
    const roomGroup: any = this.fb.group({
      type: ['', Validators.required],
      price: [0, Validators.required],
      capacity: [0, Validators.required]
    });
    this.roomTypes.push(roomGroup);
  }


  removeRoomType(index: number) {
    this.roomTypes.removeAt(index);
  }

  loadHotelData(): void {
    this.hotelService.getHotelDetails(this.hotelId).subscribe((hotel) => {
      console.log('hotel', hotel);
      this.hotelForm.patchValue(hotel);
      this.selectedImages = hotel.images || [];
    });
  }

  onAmenitiesChange(amenity: string, event: any): void {
    const amenities = this.hotelForm.get('amenities')?.value || [];
    if (event.target.checked) {
      amenities.push(amenity);
    } else {
      const index = amenities.indexOf(amenity);
      if (index > -1) amenities.splice(index, 1);
    }
    this.hotelForm.get('amenities')?.setValue(amenities);
  }

  onImageSelected(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.selectedImages.push(e.target.result);
      reader.readAsDataURL(files[i]);
    }
    this.hotelForm.get('images')?.setValue(this.selectedImages);
  }

  onSubmit(): void {
    console.log("this.hotelId, this.hotelForm.valu", this.hotelId, this.hotelForm.value)
    this.hotelService
      .updateHotel(this.hotelId, this.hotelForm.value)
      .subscribe(() => {
        alert('Hotel updated successfully!');
      });
  }
}

