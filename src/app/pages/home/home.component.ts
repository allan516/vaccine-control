import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { PetServiceService } from '../../services/pet-service.service';
import { MenuComponent } from '../../shared/menu/menu.component';
import { HttpHeaders } from '@angular/common/http';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [MenuComponent, TreeTableModule, ButtonModule, CommonModule],
  providers: [PetServiceService],
})
export class HomeComponent implements OnInit {
  files: TreeNode[] = [];
  cols: Column[] = [];

  constructor(private petServiceService: PetServiceService) {}

  getPets() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.petServiceService.getAllPet(headers).subscribe({
      next: (data) => {
        this.files = data.map((item: any) => {
          return {
            data: {
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
