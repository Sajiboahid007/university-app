import { Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutComponent {
  isSidebarOpen = signal(true);
  isSidebarCollapsed = signal(false);
  currentRoute = signal('');

  menuItems = [
    {
      label: 'Unit List',
      route: '/admin/unit-list',
      icon: '📚',
      description: 'Manage units',
    },
    {
      label: 'Level List',
      route: '/admin/level-list',
      icon: '📊',
      description: 'Manage levels',
    },
    {
      label: 'room-list',
      route: '/admin/room-list',
      icon: '🏠',
      description: 'Manage levels',
    },
    {
      label: 'Device List',
      route: '/admin/device-list',
      icon: '💻',
      description: 'Manage devices',
    },
  ];

  constructor(private router: Router) {
    // Track current route for active state
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute.set(event.url);
      });
    this.currentRoute.set(this.router.url);
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update((value) => !value);
  }

  toggleSidebarCollapse(): void {
    this.isSidebarCollapsed.update((value) => !value);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      this.isSidebarOpen.set(false);
    }
  }

  isActiveRoute(route: string): boolean {
    const routeValue = this.currentRoute();
    return routeValue === route || routeValue.startsWith(route + '/');
  }
}
