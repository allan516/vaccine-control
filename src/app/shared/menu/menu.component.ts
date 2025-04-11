import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { HomeComponent } from '../../pages/home/home.component';
import { PetDetailsComponent } from '../../pages/pet-details/pet-details.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [MenubarModule],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  @Input()
  add: string = '';

  constructor(
    private route: Router,
    private homeComponent: HomeComponent,
    private petDetailComponent: PetDetailsComponent
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.goToHome(),
      },
      {
        label: this.add,
        icon: 'pi pi-plus-circle',
        command: () => this.addItem(),
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

  addItem() {
    if (this.add === 'Adicionar Pet') {
      return this.homeComponent.addNewPet();
    }

    if (this.add === 'Adicionar Vacina') {
      return this.petDetailComponent.addNewVaccine();
    }
  }
}
