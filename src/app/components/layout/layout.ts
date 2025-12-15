import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutComponent {
  isSidenavOpen = true;

  menuItems = [
    {
      label: 'Unit List',
      route: '/admin/unit-list',
      icon: '📚',
    },
    {
      label: 'Level List',
      route: '/admin/level-list',
      icon: '📊',
    },
  ];

  constructor(private router: Router) {}

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}

