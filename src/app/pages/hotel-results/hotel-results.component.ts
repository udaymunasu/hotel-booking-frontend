import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hotel-results',
  templateUrl: './hotel-results.component.html',
  styleUrls: ['./hotel-results.component.scss'],
})
export class HotelResultsComponent {
  hotels: any[] = [];
  filters: any = {}; // Store the search filters

  destination: string = '';
  openDate: boolean = false;
  dates: any[] = [{ startDate: new Date(), endDate: new Date() }];
  min: number = 0;
  max: number = 1000;
  options = { adult: 1, children: 0, room: 1 };
  data: any[] = [];
  loading: boolean = false;
  minDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the query parameters from the URL
    this.route.queryParams.subscribe((params) => {
      // Set the filters to the query parameters
      this.filters = params;

      // Fetch hotels based on the filters
      this.fetchHotels(params);
    });
  }

  formatDate(date: Date): string {
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the month, day, and year as MM/dd/yyyy
    return `${month < 10 ? '0' + month : month}/${
      day < 10 ? '0' + day : day
    }/${year}`;
  }

  toggleDate() {
    this.openDate = !this.openDate;
  }

  onDateChange(event: any): void {
    this.dates = event.selection;
  }

  handleClick(): void {
    this.loading = true;

    const filters = {
      destination: this.destination,
      minPrice: this.min,
      maxPrice: this.max,
      adults: this.options.adult,
      children: this.options.children,
      rooms: this.options.room,
    };

    console.log('filters', filters);

    this.fetchHotels(filters);
  }

  fetchHotels(filters: any): void {
    this.http
      .get<any[]>('http://localhost:3000/api/hotels/search', {
        params: filters,
      })
      .subscribe(
        (hotels) => {
          this.hotels = hotels;
          console.log('this.hotels', this.hotels);
        },
        (error) => {
          console.error('Error fetching hotels', error);
        }
      );
  }

  goToHotelDetails(hotelId: number): void {
    this.router.navigate(['/', hotelId]);
  }
}
