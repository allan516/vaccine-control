import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { PetService } from '../../services/pet.service';
import { HttpHeaders } from '@angular/common/http';
import { TreeNode } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Vaccine } from '../../models/vaccine';
import { Pet } from '../../models/pet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [
    MenuComponent,
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
  ],
  providers: [MessageService, ConfirmationService, PetService],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css',
})
export class PetDetailsComponent implements OnInit {
  files: TreeNode[] = [];
  service: string = '';

  petDialog: boolean = false;

  pets!: Pet[];

  pet!: Pet;

  currentVaccine!: Vaccine;
  vaccine: Vaccine = { name: '', date: new Date() };

  newVaccine: Vaccine = { name: 'vacinne', date: '' };

  selectedPets!: Pet[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private petService: PetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) {}

  getVaccine(vaccine: Vaccine) {
    this.service = 'Atualizar Vacina';
    return (this.currentVaccine = vaccine);
  }

  openNew() {
    this.pet = {};
    this.submitted = false;
    this.petDialog = true;
  }

  editProduct(product: Pet | Vaccine) {
    this.pet = { ...product };
    this.petDialog = true;
  }

  addNewVaccine(product: Pet) {
    this.pet = { ...product };
    this.petDialog = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.service = 'Adicionar Nova Vacina';

    this.petService.addNewVaccineService(headers, id, this.vaccine).subscribe({
      next: () => {
        this.getPetDetails(headers, id);
      },
      error: (error) => {
        console.log(error, +' error');
      },
    });

    this.submitted = true;

    if (this.pet.name?.trim()) {
      if (this.pet.id) {
        this.pets[this.findIndexById(this.pet.id)] = this.pet;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Vacina atualizada!',
          life: 3000,
        });
      } else {
        this.pet.image = 'product-placeholder.svg';
        this.pets.push(this.pet);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.pets = [...this.pets];
      this.petDialog = false;
      this.pet = {};
    }
  }

  deleteVaccine(vaccine: Vaccine) {
    this.confirmationService.confirm({
      message: 'Deseja realmente apagar a vacina: ' + vaccine + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );
        const id = this.route.snapshot.paramMap.get('id') as string;
        this.petService;
        this.petService.deleteVaccine(headers, id, vaccine).subscribe({
          next: () => {
            this.getPetDetails(headers, id);
          },
          error: (error) => {
            console.log(error);
          },
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Vacina apagada!',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.petDialog = false;
    this.submitted = false;
  }

  updateVaccine() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const id = this.route.snapshot.paramMap.get('id') as string;

    this.petService
      .updateVaccine(headers, id, this.currentVaccine, {
        name: this.vaccine.name,
        date: this.vaccine.date || new Date(),
      })
      .subscribe({
        next: () => {
          return this.getPetDetails(headers, id);
        },
        error: (error) => {
          console.log('erro: ' + error);
        },
      });

    this.submitted = true;

    if (this.pet.name?.trim()) {
      if (this.pet.id) {
        this.pets[this.findIndexById(this.pet.id)] = this.pet;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Vacina atualizada!',
          life: 3000,
        });
      } else {
        this.pet.image = 'product-placeholder.svg';
        this.pets.push(this.pet);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.pets = [...this.pets];
      this.petDialog = false;
      this.pet = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.pets.length; i++) {
      if (this.pets[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getPetDetails(header: HttpHeaders, id: string) {
    this.petService.getPetById(header, id).subscribe({
      next: (data) => {
        return (this.pets = [
          {
            id: data._id,
            name: data.name,
            age: data.age,
            vaccines: data.vaccines,
          },
        ]);
      },
      error: () => {
        console.log('erro');
      },
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.getPetDetails(headers, id);
  }
}
