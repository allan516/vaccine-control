import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetServiceService {
  baseUrl = 'http://localhost:3000/pet';

  constructor(private http: HttpClient) {}

  getAllPet(token: HttpHeaders): Observable<any> {
    return this.http.get(this.baseUrl, { headers: token });
  }

  getPetData() {
    return [
      {
        data: {
          name: 'Other',
          age: '5mb',
          vaccines: 'Folder',
        },
      },
      {
        data: {
          name: 'Pictures',
          age: '150kb',
          vaccines: 'Folder',
        },
      },
      {
        data: {
          name: 'Videos',
          age: '1500mb',
          vaccines: 'Folder',
        },
      },
    ];
  }

  getPet() {
    return Promise.resolve(this.getPetData());
  }
}
