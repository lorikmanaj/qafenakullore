import { Component } from '@angular/core';
import { Variety } from 'src/app/models/variety';

@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.css'],
})
export class VarietyComponent {
  varieties: Variety[] = [];

  addVariety() {
    this.varieties.push({ description: '', imageUrl: null });
  }

  onImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.varieties[index].imageUrl = URL.createObjectURL(file);
    }
  }

  deleteVariety(index: number) {
    if (index >= 0 && index < this.varieties.length) {
      this.varieties.splice(index, 1);
    }
    console.log(this.varieties)
  }

  submitVariety(index: number) {
    if (index >= 0 && index < this.varieties.length) {
      const variety = this.varieties[index];
      this.varieties.splice(index, 1); // Remove the variety from its current position
      this.varieties.push(variety); // Add the variety to the end of the array
    }
    console.log('vars', this.varieties);
  }


}