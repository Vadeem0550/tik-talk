import {ChangeDetectionStrategy, Component, forwardRef, HostBinding, HostListener, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';

@Component({
   selector: 'tt-stack-input',
   standalone: true,
   imports: [
      SvgIconComponent,
      FormsModule,
      AsyncPipe,
      ReactiveFormsModule
   ],
   templateUrl: './stack-input.component.html',
   styleUrl: './stack-input.component.scss',
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         multi: true,
         useExisting: forwardRef(() => StackInputComponent)
      }
   ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackInputComponent implements ControlValueAccessor {
   @Input() triggerKey: string = '';
   // @Input() stackQuantity = 10;

   innerInput = '';
   value$ = new BehaviorSubject<string[]>([]);
   #disabled = false;

   @HostBinding('class.disabled')
   get disabled(): boolean {
      return this.#disabled;
   }

   // get isLimitReached(): boolean {
   //    return this.value$.value.length >= this.stackQuantity;
   // }

   @HostListener('keydown', ['$event'])
   onKeyDown(event: KeyboardEvent) {
     // if (this.isLimitReached) {
     //    event.preventDefault();
     //    return;
     // }

      if (event.key === this.triggerKey) {
         event.preventDefault();
         event.stopPropagation();

         if (!this.innerInput) return;

         this.value$.next([...this.value$.value, this.innerInput]);
         this.innerInput = '';

         this.onChange(this.value$.value);
      }
   }

   registerOnChange(fn: any): void {
      this.onChange = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

   setDisabledState(isDisabled: boolean): void {
      this.#disabled = isDisabled;
   }

   writeValue(stack: string[] | null): void {
      if (!stack) {
         this.value$.next([]);
         return;
      }
      this.value$.next(stack);
   }

   onChange(value: string[] | null) {}

   onTouched() {}

   onTagDelete(i: number) {
      const tags = this.value$.value;
      tags.splice(i, 1);
      this.value$.next(tags);

      this.onChange(this.value$.value);
   }
}
