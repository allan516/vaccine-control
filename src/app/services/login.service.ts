import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlApi = ' http://localhost:3000/login';

  constructor(private http: HttpClient) {}
}
