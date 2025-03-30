import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

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

  constructor(private loginService: LoginService, private route: Router) {}

  login() {
    const response = this.loginService.loginAuth(this.formulario).subscribe({
      next: (data) => {
        const res = JSON.parse(JSON.stringify(data));
        window.localStorage.setItem('token', res);
        return this.route.navigate(['/home']);
      },
      error: () => {
        console.log('erro');
      },
    });
    this.formulario.reset();
    return response;
  }
}
