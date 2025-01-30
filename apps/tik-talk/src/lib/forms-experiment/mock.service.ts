import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Feature {
  code: string;
  label: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MockService {
  getAddress() {
    return of([
      {
        city: 'Moscow',
        street: 'Tverskaya',
        building: 12,
        apartment: 3,
      },
      {
        city: 'Saint-Petersburg',
        street: 'Nevskiy',
        building: 1,
        apartment: 11,
      },
    ]);
  }

  getFeatures(): Observable<Feature[]> {
    return of([
      {
        code: 'lift',
        label: 'Подъем на этаж',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true,
      },
      {
        code: 'fast',
        label: 'Ускоренная доставка',
        value: false,
      },
    ]);
  }
}
