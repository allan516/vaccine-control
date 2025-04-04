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
        label: 'Adicionar pet',
        icon: 'pi pi-plus-circle',
      },
      {
        label: 'Pesquisar',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Components',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
              },
            ],
          },
        ],
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
