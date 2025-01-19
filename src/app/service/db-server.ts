import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DBRoomService {
  apiUrl: string = 'http://localhost:3000/api'; // Base URL for json-server
  imageuploadUrl: string = 'http://localhost:3001'; // Base URL for json-server

  private jsonServerUrl = 'http://localhost:3000/hotels'; // JSON Server

  constructor(private http: HttpClient) {}

  // User-related methods
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map(users => {
        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          // Simulate generating a token for demo purposes
          const token = `token-${user.id}`;
          return {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role || 'user' // Assuming `role` might be in user data
            },
            token: token
          };
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError(err => {
        console.error('Login error:', err);
        return of({ error: 'Invalid email or password' });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    console.log('Logout successful');
  }

  updateUser(userId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, data);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  // Hotel-related methods
  getAllHotels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels`);
  }

  getHotelDetails(hotelId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels/${hotelId}`);
  }

   // Upload image to the Node.js server
   uploadImage(image: File): Observable<any> {
    console.log("image",image, this.apiUrl)
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.imageuploadUrl}/upload`, formData);
  }

  // Create hotel and send metadata to JSON Server
  createHotel(data: any): Observable<any> {
    return this.http.post(this.jsonServerUrl, data);
  }


  getHotelById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels/${id}`);
  }
  
  updateHotel(id: string, hotel: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/hotels/${id}`, hotel);
  }
  deleteHotel(hotelId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/hotels/${hotelId}`);
  }

  // Booking-related methods
  createBooking(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, data);
  }

  getBookingById(bookingId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bookings/${bookingId}`);
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings`);
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${bookingId}`);
  }
}
