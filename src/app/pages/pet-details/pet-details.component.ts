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

  petDialog: boolean = false;

  pets!: Pet[];

  pet!: Pet;

  selectedPets!: Pet[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private petService: PetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) {}

  openNew() {
    this.pet = {};
    this.submitted = false;
    this.petDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pets = this.pets.filter(
          (val) => !this.selectedPets?.includes(val)
        );
        this.selectedPets = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Pet) {
    this.pet = { ...product };
    this.petDialog = true;
  }

  deleteProduct(product: Pet) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pets = this.pets.filter((val) => val.id !== product.id);
        this.pet = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.petDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.pet.name?.trim()) {
      if (this.pet.id) {
        this.pets[this.findIndexById(this.pet.id)] = this.pet;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
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
        console.log(data.vaccines);
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

  getVaccine(vaccine: Vaccine[]): Vaccine[] {
    let vaccines: Vaccine[] = [];
    vaccine.forEach((element) => {
      console.log(element.name);
      console.log(element.date);
      vaccines = [{ name: element.name, date: element.date }];
    });
    return vaccines;
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.getPetDetails(headers, id);
  }
}
