import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario: FormGroup = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  //private loginService = inject(LoginService);

  login() {
    console.log(this.formulario.value.name);
    this.formulario.reset();
  }
}
