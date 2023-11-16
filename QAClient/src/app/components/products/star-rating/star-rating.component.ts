import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {
  @Input() rating!: number;

  stars: number[] = [0, 0, 0, 0, 0];

  constructor() { }

  ngOnChanges() {
    this.fillStars();
  }

  fillStars() {
    const fullStars = Math.floor(this.rating);

    for (let i = 0; i < fullStars; i++) {
      this.stars[i] = 1;
    }

    const remainingStars = 5 - fullStars;

    for (let i = fullStars; i < 5; i++) {
      this.stars[i] = 0;
    }
  }

}
