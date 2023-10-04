import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  /* Slider Images  */
  imgId = 1;

  ngOnInit() {
    this.initializeImageSlider();
  }

  initializeImageSlider() {
    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = Array.from(imgs);



    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener('click', (event: Event) => {
        event.preventDefault();
        this.imgId = parseInt(imgItem.getAttribute('data-id') || '1', 10);
        this.slideImage();
    });

    });

    window.addEventListener('resize', () => this.slideImage());
  }

  slideImage() {
    const displayWidth = (document.querySelector('.img-showcase img:first-child') as HTMLElement)?.clientWidth || 0;
    const imgShowcase = document.querySelector('.img-showcase') as HTMLElement;
    if (imgShowcase) {
      imgShowcase.style.transform = `translateX(${- (this.imgId - 1) * displayWidth}px)`;
    }
  }
  /* Slider Images fund */

}
