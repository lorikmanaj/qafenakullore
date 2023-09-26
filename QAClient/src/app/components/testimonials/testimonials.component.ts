import { Testimonial } from 'src/app/models/testimonial';
import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    new Testimonial('assets/avatar.png', 'John Doe', 'Excellent service!', 5),
    new Testimonial('assets/avatar.png', 'Jane Smith', 'Highly recommend!', 4.5),
    new Testimonial('assets/avatar.png', 'Bob Johnson', 'Great experience!', 2),
    new Testimonial('assets/avatar.png', 'Alice Brown', 'Good job!', 3.5),
    new Testimonial('assets/avatar.png', 'Ella Wilson', 'Could be better.', 1.5)
  ];

  @ViewChild('testimonialcarousel') private carousel!: ElementRef;
  private currentIndex: number = 0;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // Automatically rotate testimonials every 5 seconds
    setInterval(() => this.rotateTestimonials(), 5000);
  }

  private rotateTestimonials() {
    const numVisibleCards = 3; // Number of visible testimonials at a time
    const maxIndex = this.testimonials.length - 1;
  
    // Calculate the next index to show
    let nextIndex = this.currentIndex + 1;
  
    if (nextIndex > maxIndex) {
      nextIndex = 0; // Wrap around to the first testimonial
    }
  
    // Update the CSS classes to control which testimonials are displayed
    for (let i = 0; i <= maxIndex; i++) {
      const testimonialCard = this.carousel.nativeElement.children[i];
  
      if (i === nextIndex || i === this.currentIndex) {
        // Show the current and next testimonials
        testimonialCard.classList.add('show');
      } else {
        // Hide other testimonials
        testimonialCard.classList.remove('show');
      }
    }
  
    // Update the currentIndex
    this.currentIndex = nextIndex;
  }
  

}
