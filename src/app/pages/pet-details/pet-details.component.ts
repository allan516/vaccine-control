import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { PetService } from '../../services/pet.service';
import { HttpHeaders } from '@angular/common/http';
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
  msgHeaderDialog: string = '';
  method: string = '';

  petDialog: boolean = false;
  isEmpty: boolean = false;

  pets!: Pet[];
  pet!: Pet;

  currentVaccine!: Vaccine; //nome da vacina que será atualizada
  vaccine: Vaccine = { name: '', date: new Date() }; // nova vacina ou vacinna atualizada

  selectedPets!: Pet[] | null;
  submitted: boolean = false;

  constructor(
    private petService: PetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) {}

  getVaccine(vaccine: Vaccine) {
    this.msgHeaderDialog = 'Atualizar Vacina';
    return (this.currentVaccine = vaccine);
  }

  openNew() {
    this.msgHeaderDialog = 'Adicionar Vacina';
    this.method = 'create';
    this.pet = {};
    this.submitted = false;
    this.petDialog = true;
  }

  editProduct(product: Pet | Vaccine) {
    this.method = 'update';
    this.pet = { ...product };
    this.petDialog = true;
  }

  chooseMethod() {
    switch (this.method) {
      case 'create':
        this.addNewVaccine();
        break;
      case 'update':
        this.updateVaccine();
        break;
      default:
        break;
    }
  }

  addNewVaccine() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.msgHeaderDialog = 'Adicionar Nova Vacina';
    this.isEmpty = false;

    this.petService.addNewVaccineService(headers, id, this.vaccine).subscribe({
      next: () => {
        this.submitted = true;

        if (this.vaccine) {
          if (this.vaccine.name) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Nova Vacina Criada!',
              life: 3000,
            });
          }

          this.pets = [...this.pets];
          this.petDialog = false;
          this.pet = {};
        }
        this.getPetDetails(headers, id);
      },
      error: () => {
        this.submitted = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Vacina inválida!',
          life: 3000,
        });
      },
    });
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
          summary: 'Sucesso',
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
          this.submitted = true;
          if (this.vaccine) {
            if (this.vaccine.name) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Vacina atualizada!',
                life: 3000,
              });
            }
            this.petDialog = false;
          }
          this.getPetDetails(headers, id);
        },
        error: () => {
          this.submitted = true;

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Vacina Inválida!',
            life: 3000,
          });
        },
      });
  }

  getPetDetails(header: HttpHeaders, id: string) {
    this.petService.getPetById(header, id).subscribe({
      next: (data) => {
        if (data.vaccines.length === 0) this.isEmpty = true;
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
