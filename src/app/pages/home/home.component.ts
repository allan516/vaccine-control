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
import { Pet } from '../../models/pet';
import { ToastModule } from 'primeng/toast';

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

  constructor(
    private petService: PetService,
    private route: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  getPets() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.petService.getAllPet(headers).subscribe({
      next: (data) => {
        this.files = data.map((item: any) => {
          this.id = item._id;
          return {
            data: {
              _id: item._id,
              name: item.name,
              age: item.age,
              vaccines: item.vaccines.length,
            },
            children: [],
          };
        });
      },
      error: () => {
        console.log('erro');
      },
    });
  }

  deletePet(pet: Pet) {
    this.confirmationService.confirm({
      message: `Deseja realmente apagar ${pet.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );

        this.petService.deletePetService(headers, pet._id as string).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Pet apagado com sucesso!',
              life: 3000,
            });
            this.getPets();
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      reject: () => {
        return this.getPets();
      },
    });
  }

  getPetDetailsComponent(id: string) {
    return this.route.navigate(['/pet', id]);
  }

  ngOnInit() {
    this.getPets();
    this.cols = [
      { field: 'name', header: 'Pet' },
      { field: 'age', header: 'Idade' },
      { field: 'vaccines', header: 'Vacinas' },
      { field: '', header: '' },
    ];
  }
}
