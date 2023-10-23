import { Component } from '@angular/core';
import { Variety } from 'src/app/models/variety';
import { VarietySelectionService } from 'src/app/services/variety-selection.service';

@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.css'],
})
export class VarietyComponent {
  varieties: Variety[] = [];

  constructor(private varietySelectionService: VarietySelectionService) { }

addVariety() {
  const newVariety: Variety = { description: '', imageUrl: null };
  this.varieties.push(newVariety);
}


  onImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const variety = this.varieties[index];
      this.varietySelectionService.updateVariety(index, { ...variety, imageUrl: URL.createObjectURL(file) });
    }
  }

  deleteVariety(index: number) {
    if (index >= 0 && index < this.varieties.length) {
      this.varieties.splice(index, 1);
      this.varietySelectionService.removeVariety(this.varieties[index]);
    }
  }

  // submitVariety(index: number) {
  //   if (index >= 0 && index < this.varieties.length) {
  //     const variety = this.varieties[index];
  //     this.varieties.splice(index, 1);
  //     this.varietySelectionService.addVariety(variety);
  //   }
  // }
  submitVariety(index: number) {
    if (index >= 0 && index < this.varieties.length) {
      const variety = this.varieties[index];
      this.varietySelectionService.addVariety(variety);
      // Optionally, clear the variety data or do anything else you need.
      this.varieties[index] = { description: '', imageUrl: null };
    }
  }


}
