import { Component, Input, OnChanges } from '@angular/core';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {
  @Input() rating!: number;

  faStar = faStar;
  faStarHalf = faStarHalf;

  stars: number[] = [0, 0, 0, 0, 0];

  constructor() { }

  ngOnChanges() {
    this.fillStars();
  }

  fillStars() {
    var starsToFill = Math.round(this.rating * 2) / 2;
    var i = 0;
    while (starsToFill > 0.5) {
      this.stars[i] = 1;
      i++;
      starsToFill -= 1;
    }
    if (starsToFill === 0.5) {
      this.stars[i] = 0.5;
    }
  }
}
