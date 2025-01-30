import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '@tt/data-access';

@Injectable({
  providedIn: 'root',
})
export class NameValidator implements AsyncValidator {
  http = inject(HttpClient);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http
      .get<Profile[]>('https://icherniakov.ru/yt-course/account/test_accounts')
      .pipe(
        delay(1000),
        map((users) => {
          return users.filter((u) => u.firstName === control.value).length > 0
            ? null
            : {
                nameValid: {
                  message: `Имя должно быть из списка:${users
                    .map((u) => u.firstName)
                    .join(', ')}`,
                },
              };
        })
      );
  }
}
