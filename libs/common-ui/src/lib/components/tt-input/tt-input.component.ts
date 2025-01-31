import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  input,
  signal
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
   selector: 'tt-input',
   standalone: true,
   imports: [CommonModule, FormsModule],
   templateUrl: './tt-input.component.html',
   styleUrl: './tt-input.component.scss',
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         multi: true,
         useExisting: forwardRef(() => TtInputComponent)
      }
   ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TtInputComponent implements ControlValueAccessor {
   type = input<'text' | 'password'>('text');
   placeholder = input<string>();

   value: string | null = null;

   disabled = signal<boolean>(false);
   #cdr = inject(ChangeDetectorRef)

   onChange: any;
   onTouched: any;

   writeValue(value: string | null) {
      this.value = value;
   }

   registerOnChange(fn: any): void {
      this.onChange = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

   setDisabledState(isDisabled: boolean) {
      this.disabled.set(isDisabled);
   }

   onModelChange(value: string | null): void {
      this.onChange(value);
      this.#cdr.detectChanges()
   }
}
