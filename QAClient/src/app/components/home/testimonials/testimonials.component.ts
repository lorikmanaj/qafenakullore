import { Testimonial } from 'src/app/models/testimonial';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [
    { avatarUrl: 'assets/avatar.png', name: 'John Doe', comment: 'Excellent service!', rating: 5 },
    { avatarUrl: 'assets/avatar.png', name: 'Jane Smith', comment: 'Highly recommend!', rating: 4.5 },
    { avatarUrl: 'assets/avatar.png', name: 'Bob Johnson', comment: 'Great experience!', rating: 2 },
    { avatarUrl: 'assets/avatar.png', name: 'Alice Brown', comment: 'Good job!', rating: 3.5 },
    { avatarUrl: 'assets/avatar.png', name: 'Ella Wilson', comment: 'Could be better.', rating: 1.5 }
  ];

  currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {

  }

}

