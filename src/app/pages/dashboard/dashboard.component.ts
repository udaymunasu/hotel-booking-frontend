import {
  AfterViewInit,
  Component,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DummyDataService } from './dashboardservice';
import { RoomService } from '../../service/room.service';
import { Router } from '@angular/router';
import { DBRoomService } from 'src/app/service/db-server';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  rooms: any[] = [];
  carouselImages: any[] = []; // Ensure this property is declared
  searchTerm: string = '';
  hotels: any[] = [];
  selectedDate: string = '';
  filteredHotels: any[] = [];
  headerHeight: number = 0; // Variable to store header height
  private parallaxElement: HTMLElement | null = null;

  loading: boolean = false;
  hotelForm: FormGroup;

  HotelTypes: any;
  HotelCities: any;


  destination: string = '';
  dates: any[] = [{ startDate: new Date(), endDate: new Date() }];
  openDate: boolean = false;

  topDestinationsInHyderabad: any[] = [];
  gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
  };

  constructor(
    private hotelService: RoomService,
    // private hotelService: DBRoomService,
    private dummyDataService: DummyDataService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.hotelForm = this.fb.group({
      arrivalDate: [''],
      departureDate: [''],
      adults: [''],
      children: [''],
      rooms: [''],
    });
  }

  images: string[] = [
    'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg',
  ];
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.applyParallaxEffect();
  }

  ngOnInit() {
    this.calculateHeaderHeight(); // Call it once on component initialization
    this.applyParallaxEffect();
    this.rooms = this.dummyDataService.getDummyRooms(); // Add this method in your service
    this.carouselImages = this.getCarouselImages();
    this.dummyDataService.getTopDestinations().subscribe((destinations) => {
      this.topDestinationsInHyderabad = destinations;
    });
    // this.loadHotels();
    this.startAutoPlay();
    this.topDestinationsInHyderabad.forEach((destination) => {
      destination.styles = this.getDynamicImageStyles(); // Store precomputed styles in the destination object
    });

    // Example logic to simulate loading
    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.HotelCountsByType();
  }

  formatDate(date: Date): string {
    const month = date.getMonth() + 1; // getMonth() returns month index (0-based)
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
  }


  HotelCountsByType(): void {
    this.hotelService.getHotelCountByType().subscribe(
      (data: any[]) => {
        this.HotelTypes = data;
        console.log('count of HotelTypes', data);
      },
      (error) => {
        console.error('Error fetching hotel HotelTypes:', error);
        this.loading = false;
      }
    );
  }

  getHotelCountByCities(): void {
    this.hotelService.getHotelCountByCities().subscribe(
      (data: any[]) => {
        this.HotelCities = data;
        console.log('count of HotelCities', data);
      },
      (error) => {
        console.error('Error fetching hotel counts:', error);
        this.loading = false;
      }
    );
  }


  toggleDatePicker(): void {
    this.openDate = !this.openDate;
  }

  // Format date using date-fns
  // formatDate(date: Date): string {
  //   // return format(date, 'MM/dd/yyyy');
  // }

  // Handle search action
  handleSearch(): void {
    this.onSearch()
    // Logic for searching (can be adjusted based on your need)
    console.log('Search initiated');
    console.log('Destination:', this.destination);
    console.log('Dates:', this.dates);
    
  }

  // Update selected dates
  onDatesChange(selectedDates: any): void {
    this.dates = [selectedDates.selection];
  }

  // Method triggered when the form is submitted
  onSearch(): void {
    const searchParams = this.hotelForm.value;
    this.router.navigate(['/hotel-results'], { queryParams: searchParams });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topDestinationsInHyderabad']) {
      this.getDynamicImageStyles();
    }
  }

  getDynamicImageStyles() {
    // Dynamic styles for height and width
    const randomHeight = Math.floor(Math.random() * 250) + 200; // Height between 200px and 450px
    const randomWidth = Math.floor(Math.random() * 200) + 200; // Width between 200px and 400px

    return {
      height: `${randomHeight}px`,
      width: `${randomWidth}px`,
      objectFit: 'cover',
    };
  }

  private applyParallaxEffect(): void {
    const parallaxElement = document.querySelector(
      '.custom-bg-parallax'
    ) as HTMLElement;
    const headerHeight = 80; // Header height in pixels
    const scrollPosition = window.scrollY;

    // Parallax speed factor (higher for more visible effect)
    const speed = 0.3;

    if (parallaxElement) {
      // Ensure the element doesn't overlap the header
      const adjustedScroll = Math.max(0, scrollPosition - headerHeight);

      // Apply parallax effect
      parallaxElement.style.transform = `translateY(${
        adjustedScroll * speed
      }px)`;
    }
  }

  // Use AfterViewInit to add event listeners after the component view is initialized
  ngAfterViewInit(): void {
    // Add scroll and resize event listeners
    window.addEventListener('scroll', this.applyParallaxEffect);
    window.addEventListener('resize', this.applyParallaxEffect);
  }

  currentIndex = 0;
  autoPlayInterval: any;

  // Go to the next slide
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    this.updateCarouselPosition();
  }

  // Go to the previous slide
  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.carouselImages.length) %
      this.carouselImages.length;
    this.updateCarouselPosition();
  }

  // Update carousel position by adjusting transform style
  updateCarouselPosition() {
    const carouselInner = document.querySelector(
      '.custom-carousel-inner'
    ) as HTMLElement;
    if (carouselInner) {
      carouselInner.style.transform = `translateX(-${
        this.currentIndex * 100
      }%)`;
    }
  }

  // Start auto-play
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide(); // Automatically go to the next slide
    }, 3000); // Change every 3 seconds
  }

  // Stop auto-play
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  // Listen for window resize to recalculate header height dynamically
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateHeaderHeight();
  }

  calculateHeaderHeight() {
    const header = document.querySelector('.header_area') as HTMLElement;
    if (header) {
      this.headerHeight = header.offsetHeight; // Get height of header
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    window.removeEventListener('scroll', this.applyParallaxEffect);
    window.removeEventListener('resize', this.applyParallaxEffect);
  }

  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data; // Assign the fetched hotels to the local array
        console.log('this.hotels', this.hotels);
        this.filteredHotels = this.hotels; // Initialize filteredHotels
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
      },
    });
  }

  filterHotels(): void {
    this.filteredHotels = this.hotels.filter((hotel) => {
      const matchesLocation = hotel.location
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      // For demonstration, you might want to implement actual date filtering logic
      // For now, let's just check if a date is selected
      const matchesDate = this.selectedDate ? true : true; // Replace with actual logic if needed
      return matchesLocation && matchesDate;
    });
  }

  private getCarouselImages() {
    return [
      {
        title: 'Welcome to Our Hotel',
        description: 'Experience luxury and comfort like never before.',
        image: '/assets/image/carousel/carousel_1.jpg',
      },
      {
        title: 'Relax and Unwind',
        description: 'Discover the ultimate relaxation at our spa.',
        image: '/assets/image/carousel/carousel_2.jpg',
      },
      {
        title: 'Dine in Style',
        description: 'Enjoy exquisite cuisine at our restaurant.',
        image: '/assets/image/carousel/carousel_3.jpg',
      },
    ];
  }
}
