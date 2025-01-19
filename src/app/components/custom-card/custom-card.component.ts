import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss']
})
export class CustomCardComponent implements OnInit {

  @Input() image: string = ''; // Image URL or path
  @Input() name: string = '';  // Name (e.g., title)
  @Input() description: string = '';  // Description of the card
  @Input() location: string = '';  // Location info
  @Input() data: any;  // Location info
  constructor() { }

  ngOnInit(): void {
  }

}
