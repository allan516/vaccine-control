import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaccine } from '../models/vaccine';
import { Pet } from '../models/pet';

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

  updatePet(token: HttpHeaders, id: string, pet: Pet): Observable<Object> {
    return this.http.patch(`${this.baseUrl}/${id}`, pet, {
      headers: token,
    });
  }

  deletePetService(token: HttpHeaders, id: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: token });
  }

  updateVaccine(
    token: HttpHeaders,
    id: string,
    currentVaccine: Vaccine,
    vaccine: Vaccine
  ): Observable<Object> {
    return this.http.patch(
      `${this.baseUrl}/${id}/vaccine/${currentVaccine}`,
      vaccine,
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
    return this.http.delete(`${this.baseUrl}/${id}/vaccine/${vaccine.id}`, {
      headers: token,
    });
  }

  addNewVaccineService(
    token: HttpHeaders,
    id: string,
    vaccine: Vaccine
  ): Observable<Object> {
    return this.http.post(
      `${this.baseUrl}/${id}/vaccine`,
      { name: vaccine.name, date: vaccine.date },
      {
        headers: token,
      }
    );
  }
  addNewPetService(token: HttpHeaders, pet: Pet): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, pet, { headers: token });
  }
}
