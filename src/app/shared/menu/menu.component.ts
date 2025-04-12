import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [MenubarModule],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private route: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.goToHome(),
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.logOut(),
      },
    ];
  }

  logOut(): ((event: MenuItemCommandEvent) => void) | undefined {
    localStorage.clear();
    this.route.navigate(['/']);
    return;
  }

  goToHome() {
    this.route.navigate(['/home']);
  }
}
