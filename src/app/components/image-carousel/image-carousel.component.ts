import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit {
  @Input() width: string = '100%'; // Default to full width
  @Input() height: string = '300px'; // Default height
  @Input() autoSlideInterval: number = 3000; // Slide interval in milliseconds
  @Input() images: string[] = []; // Array of image URLs

  // images: string[] = ['assets/image1.jpg', 'assets/image2.jpg', 'assets/image3.jpg'];
  currentIndex: number = 0;
  slideInterval: any;
  isHovered: boolean = false;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the first image
    }
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1; // Loop back to the last image
    }
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      if (!this.isHovered) {
        this.nextImage();
      }
    }, this.autoSlideInterval);
  }

  stopAutoSlide(): void {
    clearInterval(this.slideInterval);
  }

  onHover(): void {
    this.isHovered = true;
    this.stopAutoSlide();
  }

  onMouseLeave(): void {
    this.isHovered = false;
    this.startAutoSlide();
  }
}
