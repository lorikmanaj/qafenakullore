import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  isCollapsed = false;
  title = 'QAClient';
  expanded: boolean = false;

  selectedType: string = 'Home';

  constructor() { }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  selectProductType(type: string) {
    this.selectedType = type;
  }
}

