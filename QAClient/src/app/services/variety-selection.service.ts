import { Injectable } from '@angular/core';
import { Variety } from '../models/variety';

@Injectable({
  providedIn: 'root',
})
export class VarietySelectionService {
  selectedVarieties: Variety[] = [];

  addVariety(variety: Variety) {
    this.selectedVarieties.push(variety);
  }

  updateVariety(index: number, updatedVariety: Variety) {
    if (index >= 0 && index < this.selectedVarieties.length) {
      this.selectedVarieties[index] = updatedVariety;
    }
  }

  removeVariety(variety: Variety) {
    const index = this.selectedVarieties.indexOf(variety);
    if (index !== -1) {
      this.selectedVarieties.splice(index, 1);
    }
  }
}
