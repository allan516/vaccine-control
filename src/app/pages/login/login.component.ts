import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario: FormGroup = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  //private loginService = inject(LoginService);

  constructor(private loginService: LoginService) {}

  login() {
    const response = this.loginService.loginAuth(this.formulario).subscribe({
      next: (data) => console.log('Token: ' + data),
      error: () => {
        console.log('erro');
      },
    });
    this.formulario.reset();
    return response;
  }
}
