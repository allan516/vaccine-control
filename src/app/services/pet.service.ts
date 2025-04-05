import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  baseUrl = 'http://localhost:3000/pet';

  constructor(private http: HttpClient) {}

  getAllPet(token: HttpHeaders): Observable<any> {
    return this.http.get(this.baseUrl, { headers: token });
  }

  getPetById(token: HttpHeaders, id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: token });
  }
}
