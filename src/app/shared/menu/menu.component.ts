import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

import { PetService } from '../../services/pet.service';
import { HttpHeaders } from '@angular/common/http';
import { Vaccine } from '../../models/vaccine';

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
  newVaccine: Vaccine = { name: 'vacinne', date: '' };

  constructor(
    private route: Router,
    private routerParam: ActivatedRoute,
    private petService: PetService
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
        command: () =>
          this.add === 'Adicionar Pet' ? this.addPet() : this.addVaccine(),
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

  addPet() {
    if (this.add === 'Adicionar Pet') {
      return this.petService.addNewPetService();
    }
  }

  addVaccine() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const id = this.routerParam.snapshot.paramMap.get('id') as string;

    return this.petService
      .addNewVaccineService(headers, id, this.newVaccine)
      .subscribe({
        next: () => {
          return this.route.navigate([`/pet/${id}`]);
        },
        error: (error) => {
          console.log(error, +' error');
        },
      });
  }
}
