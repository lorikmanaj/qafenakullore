import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebarVisible = false;

  constructor() { }

  ngOnInit(): void { }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
