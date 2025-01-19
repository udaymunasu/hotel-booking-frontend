import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  apiUrl: string = 'http://localhost:3000/api';

  private token: string | null = localStorage.getItem('authToken'); // Assume token is stored in localStorage
  // Set the Authorization header with the token
  
  constructor(private http: HttpClient) {}

  getLoggedInUserId(): string | null {
    // Assuming the user ID is stored in the localStorage after login
    // You can also extract it from JWT token or from a user session
    const userdata = localStorage.getItem('hotelUser')
    return userdata ? JSON.parse(userdata)._id || null : null;
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  getUserProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/profile/${userId}`);
  }

  updateUserProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/profile`, profileData);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/users`);
  }

  updateUser(userId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/users/${userId}`, data);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/auth/users/${userId}`);
  }

  getAllHotels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels`);
  }

  getHotelDetails(hotelId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels/${hotelId}`);
  }


  // Upload image to the Node.js server
  uploadImage(image: File): Observable<any> {
    console.log("image",image, this.apiUrl)
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  

  createHotel(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Add Bearer prefix
    });
    console.log("data", data)
    return this.http.post(`${this.apiUrl}/hotels`, data,  { headers });
  }

  deleteHotel(hotelId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/hotels/${hotelId}`);
  }

  searchHotels(searchParams: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hotels/search-hotels`, searchParams);
  }

  getHotelCountByType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hotels/countHotelsByType`);
  }

  getHotelCountByCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hotels/countHotelsByCity`);
  }

  // Booking API methods
  createBooking(data: any): Observable<any> {
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Send the token in Authorization header
    });
    return this.http.post(`${this.apiUrl}/bookings`, data, {headers});
  }

  updateHotel(hotelId: string, data: any): Observable<any> {
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Send the token in Authorization header
    });
    return this.http.put(`${this.apiUrl}/hotels/${hotelId}`, data, {headers});
  }


  getBookingById(bookingId: string): Observable<any> {
    const token = localStorage.getItem('authToken');  // Retrieve the token from localStorage

    if (!token) {
      console.error('No token found!');
      return throwError('No token found!');
    }

    // Attach the token to the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/bookings`, { headers });
  }

  bookHotel(bookingData: any): Observable<any> {
    console.log("bookingData", bookingData)
    return this.http.post(`${this.apiUrl}/bookings`, bookingData);
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings`);
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${bookingId}`);
  }
}
