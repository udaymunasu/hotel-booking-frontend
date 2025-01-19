import { Component } from '@angular/core';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profileData = {
    user_id: '12345',
    name: '',
    email: '',
    phone_number: '',
    dob: '',
    gender: '',
    pan_number: '',
    address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    },
    profile_picture_url: '',
    preferences: ''
  };


  isEditing = false;

  constructor(private profileService: RoomService) {}

  ngOnInit(): void {
    console.log('ProfileComponent loaded');
    const loggedInUserId = this.profileService.getLoggedInUserId();
    console.log("loggedInUserId", loggedInUserId)
    if (loggedInUserId) {
      // Set the user_id from the logged-in user's ID
      this.profileData.user_id = loggedInUserId;
      this.loadProfile();
    } else {
      console.error('User is not logged in');
    }
  }

  loadProfile(): void {
    this.profileService.getUserProfile(this.profileData.user_id).subscribe(
      (data) => {
        if (data) {
          this.profileData = data;
        }
      },
      (error) => {
        console.error('Error loading profile data', error);
      }
    );
  }

  onEdit(): void {
    this.isEditing = true;
  }
  selectedFile: File | null = null;

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0]; // Get the file selected by the user
  }
  

  onSubmit(): void {
    const formData = new FormData();
    
    // Append the profile fields
    formData.append('name', this.profileData.name);
    formData.append('email', this.profileData.email);
    formData.append('phone_number', this.profileData.phone_number);
    formData.append('dob', this.profileData.dob);
    formData.append('gender', this.profileData.gender);
    formData.append('pan_number', this.profileData.pan_number);
    formData.append('address', JSON.stringify(this.profileData.address)); // If it's an object, stringify it

    // Append the file if there's one
    if (this.selectedFile) {
      formData.append('profile_picture', this.selectedFile, this.selectedFile.name);
    }

    console.log("formData", formData)
    // Make API request to save/update profile data
    this.profileService.updateUserProfile(formData).subscribe(
      (response) => {
        console.log('Profile updated successfully', response);
        // Handle success (e.g., redirect or show success message)
      },
      (error) => {
        console.error('Error updating profile', error);
        // Handle error (e.g., show error message)
      }
    );
  }
}
