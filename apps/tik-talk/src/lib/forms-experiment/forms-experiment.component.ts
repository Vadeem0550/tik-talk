import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Feature, MockService } from './mock.service';
import { KeyValuePipe } from '@angular/common';
import { NameValidator } from './name.validator';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

interface Address {
  city?: string;
  street?: string;
  building?: number;
  apartment?: number;
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  });
}

function validateStartWith(forbiddenLetter: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(forbiddenLetter)
      ? {
          startsWith: {
            message: `${forbiddenLetter} - последняя буква алфавита!`,
          },
        }
      : null;
  };
}

function validateDateRange({
  fromControlName,
  toControlName,
}: {
  fromControlName: string;
  toControlName: string;
}) {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);

    if (!fromControl || !toControl) return null;

    const fromDate = new Date(fromControl.value);
    const toDate = new Date(toControl.value);

    if (fromDate && toDate && fromDate > toDate) {
      toControl.setErrors({
        dateRange: { message: 'Дата начала не может быть позднее даты конца' },
      });
      return {
        dateRange: { message: 'Дата начала не может быть позднее даты конца' },
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-forms-experiment',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './forms-experiment.component.html',
  styleUrl: './forms-experiment.component.scss',
})
export class FormsExperimentComponent {
  protected readonly ReceiverType = ReceiverType;
  mockService = inject(MockService);
  nameValidator = inject(NameValidator);

  features: Feature[] = [];

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', {
      validators: [Validators.required],
      asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
      updateOn: 'blur',
    }),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>('VALUE'),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({}),
    dateRange: new FormGroup(
      {
        from: new FormControl<string>(''),
        to: new FormControl<string>(''),
      },
      validateDateRange({ fromControlName: 'from', toControlName: 'to' })
    ),
  });

  constructor() {
    this.mockService
      .getAddress()
      .pipe(takeUntilDestroyed())
      .subscribe((addrs) => {
        while (this.form.controls.addresses.controls.length > 0) {
          this.form.controls.addresses.removeAt(0);
        }
        // Идентично способу выше
        // this.form.controls.addresses.clear()

        for (const addr of addrs) {
          this.form.controls.addresses.push(getAddressForm(addr));
        }

        //заменяет контрол по индексу
        // this.form.controls.addresses.setControl(0, getAddressForm(addrs[1]));

        //берет контрол по определенному индексу
        // this.form.controls.addresses.at(0)
      });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value)
          );
        }
      });

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        console.log(value);
        this.form.controls.inn.clearValidators();

        if (value === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]);
        }
      });

    // this.form.patchValue(formPatch);
    //    this.form.setValue({
    //       type: ReceiverType.PERSON,
    //       name: 'AAA',
    //       lastName: 'BBB',
    //       inn: '12',
    //       address: {
    //          city: '',
    //          street: '',
    //          building: 123,
    //          apartment: 2323
    //       }
    //    });
  }

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    console.log('this.form.valid', this.form.valid);
    console.log('this.form.getRawValue', this.form.getRawValue());
  }

  addAddress() {
    this.form.controls.addresses.insert(0, getAddressForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {
      emitEvent: false,
    });
  }

  sort = () => 0;
}
