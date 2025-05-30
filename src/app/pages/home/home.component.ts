import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { PetService } from '../../services/pet.service';
import { MenuComponent } from '../../shared/menu/menu.component';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PetDetailsComponent } from '../pet-details/pet-details.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IPet } from '../../models/IPet';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [
    ToastModule,
    MenuComponent,
    TreeTableModule,
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,

    TableModule,
    DialogModule,
    RippleModule,
    ToolbarModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
  ],
  providers: [
    PetService,
    PetDetailsComponent,
    MessageService,
    ConfirmationService,
  ],
})
export class HomeComponent implements OnInit {
  files: TreeNode[] = [];
  cols: Column[] = [];
  id: string = '';
  isEmpty: boolean = false;
  petDialog: boolean = false;
  msgHeaderDialog: string = '';
  pet!: any;
  numberPets!: number;
  submitted: boolean = false;
  menuOptions: boolean = false;
  method!: string;

  constructor(
    private petService: PetService,
    private route: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  getPets() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let count = 0;

    this.petService.getAllPet(headers).subscribe({
      next: (data) => {
        if (data.length === 0) this.isEmpty = true;
        this.files = data.map((item: IPet) => {
          this.id = item._id;
          count++;
          return {
            data: {
              _id: item._id,
              name: item.name,
              age: item.age,
              category: item.category,
              breed: item.breed,
              vaccines: item.vaccines.length,
            },
            children: [],
          };
        });
        this.numberPets = count;
      },
      error: () => {
        console.log('erro');
      },
    });
  }

  addNewPet() {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.petService.addNewPetService(header, this.pet).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pet criado com sucesso!',
          life: 3000,
        });
        this.isEmpty = false;
        this.petDialog = false;
        this.getPets();
      },
      error: () => {
        if (!this.pet.name || !this.pet.age) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Todos os campos devem ser preenchidos.',
            life: 3000,
          });
        } else if (this.numberPets >= 3) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Número máximo de pets.',
            life: 3000,
          });
          this.petDialog = false;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Ocorreu um erro inesperado.',
            life: 3000,
          });
        }
      },
    });
  }

  editPet() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(this.id);
    this.petService.updatePet(headers, this.id, this.pet).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pet atualizado!',
          life: 3000,
        });
        this.petDialog = false;
        this.menuOptions = false;
        this.getPets();
      },
      error: () => {
        if (!this.pet.name || !this.pet.age) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Todos os campos devem ser preenchidos.',
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Ocorreu um erro inesperado.',
            life: 3000,
          });
        }
      },
    });
  }

  deletePet() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.confirmationService.confirm({
      message: `Deseja realmente apagar ${this.pet.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.petService
          .deletePetService(headers, this.pet._id as string)
          .subscribe({
            next: () => {
              this.menuOptions = false;
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Pet apagado com sucesso!',
                life: 3000,
              });
              this.confirmationService.close();
              this.getPets();
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Ocorreu um erro inesperado.',
                life: 3000,
              });
              this.confirmationService.close();
              this.getPets();
            },
          });
      },
      reject: () => {
        this.confirmationService.close();
        return this.getPets();
      },
    });
  }

  getPetDetailsComponent() {
    return this.route.navigate(['/pet', this.id]);
  }

  hideDialog() {
    this.petDialog = false;
    this.menuOptions = false;
    this.submitted = false;
  }

  openNew() {
    this.msgHeaderDialog = 'Adicionar';
    this.pet = {};
    this.method = 'create';
    this.submitted = false;
    this.petDialog = true;
  }

  edit() {
    this.msgHeaderDialog = 'Editar';
    this.pet = {};
    this.method = 'update';
    this.submitted = false;
    this.petDialog = true;
  }

  openMenuToChoose(pet: IPet, id: string) {
    this.pet = pet;
    this.id = id;
    this.msgHeaderDialog = 'Menu de opções';
    this.menuOptions = true;
  }

  chooseMethod() {
    switch (this.method) {
      case 'create':
        this.addNewPet();
        break;
      case 'update':
        this.editPet();
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.getPets();
    this.cols = [
      { field: 'name', header: 'Pet' },
      { field: 'age', header: 'Idade' },
      { field: 'category', header: 'Categoria' },
      { field: 'breed', header: 'Raça' },
    ];
  }
}
