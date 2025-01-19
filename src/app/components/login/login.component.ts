import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DBRoomService } from 'src/app/service/db-server';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  loginForm: FormGroup;

  roles = ['user', 'admin']; // Available roles

  constructor(
    // private authService: DBRoomService,
    private authService: RoomService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    console.log('Logging in with:', this.loginForm.value); // For debugging

    if (this.loginForm.valid) {
      console.log('Logging in with:', this.loginForm.value); // For debugging
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res?.user) {
            localStorage.setItem('hotelUser', JSON.stringify(res.user));
            localStorage.setItem('hotelUser', JSON.stringify(res.user));
            localStorage.setItem('authToken', res.token);
            // Also store the user role for later use
            localStorage.setItem('userRole', res.user.role);
            this.router.navigate(['/dashboard']); // Redirect after successful login
          } else {
            alert('Invalid credentials. Please try again.');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          alert('An error occurred. Please try again.');
        },
      });
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}
