import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PetServiceService {
  constructor() {}

  getPetData() {
    return [
      {
        data: {
          name: 'Other',
          size: '5mb',
          type: 'Folder',
        },
      },
      {
        data: {
          name: 'Pictures',
          size: '150kb',
          type: 'Folder',
        },
      },
      {
        data: {
          name: 'Videos',
          size: '1500mb',
          type: 'Folder',
        },
      },
    ];
  }

  getPet() {
    return Promise.resolve(this.getPetData());
  }
}
