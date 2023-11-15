import { Injectable } from '@angular/core';
import { Variety } from '../../models/variety';

@Injectable({
  providedIn: 'root',
})
export class VarietySelectionService {
  private varieties: Variety[] = [];

  getVarieties() {
    return this.varieties;
  }

  addVariety(variety: Variety) {
    this.varieties.push(variety);
  }

  updateVariety(index: number, updatedVariety: Variety) {
    if (index >= 0 && index < this.varieties.length) {
      this.varieties[index] = updatedVariety;
    }
  }

  removeVariety(variety: Variety) {
    const index = this.varieties.indexOf(variety);
    if (index !== -1) {
      this.varieties.splice(index, 1);
    }
  }
}
