import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { debounceTime, switchMap, tap } from 'rxjs';
import { DadataServices } from '../../../../../profile/src/lib/dadata';

@Component({
   selector: 'tt-address-input',
   standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    TtInputComponent,
    JsonPipe
  ],
   templateUrl: './address-input.component.html',
   styleUrl: './address-input.component.scss',
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         multi: true,
         useExisting: forwardRef(() => AddressInputComponent)
      }
   ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInputComponent implements ControlValueAccessor {
  innerSearchControl = new FormControl();

  isDropdownOpened = signal<boolean>(false);

  #dadataServices = inject(DadataServices);
  #cdr = inject(ChangeDetectorRef)

  suggestions$ = this.innerSearchControl.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(value => {
        return this.#dadataServices.getSuggestion(value)
      }))
    .pipe(
      tap(res => {
        this.isDropdownOpened.set(!!res.length)
      })
    )

  writeValue(city: string | null): void {
    if (city !== null) {
      this.innerSearchControl.patchValue(city, { emitEvent: false });
    }
   }

   registerOnChange(fn: any): void {
      this.onChange = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

   setDisabledState(isDisabled: boolean): void {}

   onChange(value: any) {}

   onTouched() {}

  onSuggestionPick(city: string) {
    this.isDropdownOpened.set(false);

    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    });

    this.onChange(city)
    this.#cdr.detectChanges()
  }
}
