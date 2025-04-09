import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaccine } from '../models/vaccine';
import { Form, FormGroup } from '@angular/forms';

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

  updateVaccine(
    token: HttpHeaders,
    id: string,
    vaccine: string,
    currentVaccine: Vaccine
  ): Observable<Object> {
    return this.http.patch(
      `${this.baseUrl}/${id}/vaccine/${vaccine}`,
      currentVaccine,
      {
        headers: token,
      }
    );
  }
}
