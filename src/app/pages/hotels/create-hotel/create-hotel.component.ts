import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { DBRoomService } from 'src/app/service/db-server';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss'],
})
export class CreateHotelComponent implements OnInit {
  hotelForm: FormGroup;
  amenitiesList: string[] = [
    'WiFi',
    'Pool',
    'Gym',
    'Spa',
    'Parking',
    'Restaurant',
    'Bar',
    'Room Service',
    'Air Conditioning',
    'Pet Friendly',
  ];

  selectedFiles: File[] = []; // Store file objects
  selectedImages: string[] = []; // Store Base64 strings for previews

  filePreviews: any[] = [];

  constructor(
    private fb: FormBuilder,
    private hotelService: RoomService,
    private http: HttpClient,
    // private hotelService: DBRoomService,

    private router: Router
  ) {
    this.hotelForm = this.fb.group({
      name: [''],
      description: [''],
      location: [''],
      pricePerNight: [0],
      amenities: [[]], // This will hold the selected amenities
      images: [],
      rating: [0],
      roomTypes: this.fb.array([]), // Initialize room types array
    });
  }

  ngOnInit(): void {}

  get roomTypes(): FormArray {
    return this.hotelForm.get('roomTypes') as FormArray;
  }

  addRoomType() {
    const roomTypes = this.hotelForm.get('roomTypes') as FormArray;
    roomTypes.push(
      this.fb.group({
        type: [''],
        price: [0, [Validators.min(0)]],
        capacity: [1, [Validators.min(1)]],
      })
    );
  }

  onAmenitiesChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const amenities: string[] = this.hotelForm.get('amenities')?.value || [];

    if (checkbox.checked) {
      // Add the selected amenity if checked
      amenities.push(checkbox.value);
    } else {
      // Remove the unselected amenity if unchecked
      const index = amenities.indexOf(checkbox.value);
      if (index > -1) {
        amenities.splice(index, 1);
      }
    }

    console.log('amenities', amenities);

    // Update the form control with the selected amenities
    this.hotelForm.patchValue({ amenities });
  }
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  imageUrl: string | null = null;

  onImageSelected(event: any): void {
    const files = event.target.files; // Get selected files
    this.filePreviews = []; // Clear the preview array before adding new ones
    this.hotelForm.setControl('images', this.fb.array([])); // Reset images array to avoid old files

    // Loop through each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Create a preview URL for the file (useful for showing previews in the UI)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const previewUrl = e.target.result;
        this.filePreviews.push({ file, previewUrl });

        // Add the file to the FormArray for 'images'
        (this.hotelForm.get('images') as FormArray).push(this.fb.control(file));
      };
      reader.readAsDataURL(file); // Read the file to generate preview
    }
  }

  addImageToForm(file: File) {
    const imageFormControl = this.fb.control(file);
    (this.hotelForm.get('images') as FormArray).push(imageFormControl);
  }

  ngOnDestroy() {
    this.selectedFiles = []; // Clear files when component is destroyed
    this.selectedImages = []; // Clear previews
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) {
      return;
    }

    const formData = new FormData();
    const formValue = this.hotelForm.value;

    // Append other form fields to the formData
    formData.append('name', this.hotelForm.get('name')?.value);
    formData.append('description', this.hotelForm.get('description')?.value);
    formData.append('location', this.hotelForm.get('location')?.value);
    formData.append(
      'pricePerNight',
      this.hotelForm.get('pricePerNight')?.value
    );
    formData.append(
      'amenities',
      JSON.stringify(this.hotelForm.get('amenities')?.value)
    );

    // Collect the selected images and append them to the formData
    const images = formValue.images;
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i], images[i].name); // The second parameter is the file itself
    }

    console.log('formData', formData);
    // Log formData content for debugging

    // Send the form data to the backend
    this.hotelService.createHotel(formData).subscribe(
      (response) => {
        console.log('Hotel created successfully', response);
      },
      (error) => {
        console.error('Error creating hotel', error);
      }
    );
  }
}
