import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { PetServiceService } from '../../services/pet-service.service';
import { MenuComponent } from '../../shared/menu/menu.component';

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
  files!: TreeNode[];

  cols!: Column[];

  constructor(private petServiceService: PetServiceService) {}

  ngOnInit() {
    this.petServiceService.getPet().then((files) => (this.files = files));
    this.cols = [
      { field: 'name', header: 'Pet' },
      { field: 'size', header: 'Idade' },
      { field: 'type', header: 'Vacinas' },
      { field: '', header: '' },
    ];
  }
}
