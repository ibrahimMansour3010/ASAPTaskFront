import { Component } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { navItems } from './sidebar-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems = navItems;

  constructor(public navService: NavService) {}

  ngOnInit(): void {}
}
