import { Component, Input, Output, EventEmitter, OnInit, HostBinding } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
  }
}
