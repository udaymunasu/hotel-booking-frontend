import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DBRoomService } from 'src/app/service/db-server';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {}

  registerForm: FormGroup;

  roles = ['user', 'admin']; // Available roles


  constructor(
    private authService: RoomService,
    // private authService: DBRoomService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: [''], // Default role set to 'user'
    });
  }

  onLogin() {
    if (this.registerForm.valid) {
      console.log('Registering with:', this.registerForm.value); // For debugging
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          if (res?.user) {
            // Navigate to login or another page after successful registration
            this.router.navigate(['/login']);
          } else {
            alert('Registration failed. Please try again.');
          }
        },
        error: (error) => {
          console.error('Registration error:', error);
          alert('An error occurred. Please try again.');
        },
      });
    } else {
      alert('Please fill in the form correctly.');
    }
  }

}
