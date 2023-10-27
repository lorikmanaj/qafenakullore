import { Component } from '@angular/core';
import { Variety } from 'src/app/models/variety';
import { VarietySelectionService } from 'src/app/services/variety-selection.service';

@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.css'],
})
export class VarietyComponent {
  varietyForms: Variety[] = [];

  constructor(private varietySelectionService: VarietySelectionService) { }

  addVariety() {
    this.varietyForms.push({ description: '', imageUrl: '' });
  }

  onImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.varietyForms[index].imageUrl = URL.createObjectURL(file);
    }
  }

  deleteVarietyForm(index: number) {
    if (index >= 0 && index < this.varietyForms.length) {
      this.varietyForms.splice(index, 1);
    }
  }

  submitVarietyForm(index: number) {
    if (index >= 0 && index < this.varietyForms.length) {
      const variety = this.varietyForms[index];
      this.varietySelectionService.addVariety(variety);
      this.varietyForms.splice(index, 1);
    }
  }

  deleteVariety(index: number) {
    if (index >= 0 && index < this.varietySelectionService.getVarieties().length) {
      const variety = this.varietySelectionService.getVarieties()[index];
      this.varietySelectionService.removeVariety(variety);
    }
  }
}
