import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaccine } from '../models/vaccine';

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
    vaccine: Vaccine,
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

  deleteVaccine(
    token: HttpHeaders,
    id: string,
    vaccine: Vaccine
  ): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}/vaccine/${vaccine}`, {
      headers: token,
    });
  }
}
