import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageComponent } from '../../shared/messages/messages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MessageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  message!: boolean;

  //private loginService = inject(LoginService);

  constructor(private loginService: LoginService, private route: Router) {}

  login() {
    this.message = false;
    const response = this.loginService.loginAuth(this.form).subscribe({
      next: (data) => {
        const res = JSON.parse(JSON.stringify(data));
        window.localStorage.setItem('token', res);
        return this.route.navigate(['/home']);
      },
      error: () => {
        return (this.message = true);
      },
    });
    this.form.reset();
    return response;
  }
}
