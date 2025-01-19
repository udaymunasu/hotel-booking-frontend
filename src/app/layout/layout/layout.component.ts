import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  loggedUserData: any;

  private headerElement: HTMLElement;
  private navOffsetTop: number;

  headerHeight: number = 0;  // Variable to store header height


  constructor(private router: Router, private elRef: ElementRef) {
    const localData = localStorage.getItem('hotelUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  ngOnInit(): void {
    this.calculateHeaderHeight();  // Call it once on component initialization

    this.headerElement = this.elRef.nativeElement.querySelector('.header_area');
    if (this.headerElement) {
      // Calculate the initial offset of the navbar
      this.navOffsetTop = this.headerElement.offsetTop + 85; // 50px offset
      console.log("this.navOffsetTop", this.navOffsetTop)
      // Add scroll event listener
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  

  isNavbarOpen = false;

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
    const navbarContent = document.getElementById('navbarSupportedContent');
    
    if (navbarContent) {
      if (this.isNavbarOpen) {
        // navbarContent.classList.add('collapse');
        navbarContent.classList.remove('show'); // Hide navbar
      } else {
        // navbarContent.classList.remove('collapse');
        navbarContent.classList.add('show'); // Show navbar
      }
    }
  }

  onLogoff() {
    localStorage.removeItem('hotelUser');
    this.loggedUserData = undefined;
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    // Clean up the event listener when the component is destroyed
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  // Handle scroll event and toggle the navbar fixed class
  handleScroll(): void {
    const scroll = window.scrollY;

    if (scroll > this.navOffsetTop) {
      this.headerElement.classList.add('navbar_fixed');
    } else {
      this.headerElement.classList.remove('navbar_fixed');
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
      this.headerHeight = header.offsetHeight;  // Get height of header
    }
  }

}
