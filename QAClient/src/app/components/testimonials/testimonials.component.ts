import { Testimonial } from 'src/app/models/testimonial';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [
    new Testimonial('assets/avatar.png', 'John Doe', 'Excellent service!', 5),
    new Testimonial('assets/avatar.png', 'Jane Smith', 'Highly recommend!', 4.5),
    new Testimonial('assets/avatar.png', 'Bob Johnson', 'Great experience!', 2),
    new Testimonial('assets/avatar.png', 'Alice Brown', 'Good job!', 3.5),
    new Testimonial('assets/avatar.png', 'Ella Wilson', 'Could be better.', 1.5)
  ];

  currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {

  }


}

