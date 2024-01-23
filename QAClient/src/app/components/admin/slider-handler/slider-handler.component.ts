import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Slider } from 'src/app/models/slider';
import { SlidersService } from 'src/app/services/sliders.service';

@Component({
  selector: 'app-slider-handler',
  templateUrl: './slider-handler.component.html',
  styleUrls: ['./slider-handler.component.css']
})
export class SliderHandlerComponent implements OnInit {
  carouselSliders: Slider[] = [];

  constructor(private slidersService: SlidersService) { }

  ngOnInit(): void {
    this.fetchSliders();
  }

  fetchSliders(): void {
    this.slidersService.getSliders().subscribe(
      (sliders: Slider[]) => {
        this.carouselSliders = sliders;
      },
      (error) => {
        console.error('Error fetching sliders:', error);
        // Handle error as needed
      }
    );
  }

  setActive(sliderId: number) {
    this.slidersService.setActive(sliderId).subscribe(
      () => {
        // Handle success, if needed
        this.fetchSliders(); // Refresh sliders after setting active
      },
      (error) => {
        console.error('Error setting slider as active:', error);
        // Handle error as needed
      }
    );
  }

  constructImageUrl(imagePath: string): string {
    return `${environment.serverBaseUrl}${imagePath}`;
  }
}