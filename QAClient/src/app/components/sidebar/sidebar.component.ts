import { Component, OnInit, HostBinding } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isCollapsed = false;

  constructor(private sidebarService: SidebarService) { }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
