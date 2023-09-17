import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css'],
})
export class MainSectionComponent implements OnInit {
  carouselOptions = {
    loop: true,
    items: 3, // Display 3 items at a time (adjust as needed)
    margin: 10,
    nav: true,
  };

  products = [
    {
      title: 'Product 1',
      description: 'Description of Product 1.',
      image: 'product1.jpg',
    },
    {
      title: 'Product 2',
      description: 'Description of Product 2.',
      image: 'product2.jpg',
    },
    {
      title: 'Product 3',
      description: 'Description of Product 3.',
      image: 'product3.jpg',
    },
    {
      title: 'Product 4',
      description: 'Description of Product 4.',
      image: 'product4.jpg',
    },
    {
      title: 'Product 5',
      description: 'Description of Product 5.',
      image: 'product5.jpg',
    },
    {
      title: 'Product 6',
      description: 'Description of Product 6.',
      image: 'product6.jpg',
    },
  ];

  constructor() { }

  ngOnInit(): void { }
}
