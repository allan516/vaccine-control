import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlApi = 'https://vaccine-production-9659.up.railway.app/login';
  //private urlApi = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  loginAuth(form: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(this.urlApi, {
      name: form.value.name,
      password: form.value.password,
    });
  }
}
