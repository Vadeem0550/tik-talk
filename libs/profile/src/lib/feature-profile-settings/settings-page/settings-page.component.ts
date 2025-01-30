import {ChangeDetectionStrategy, Component, effect, inject, ViewChild} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {AddressInputComponent, StackInputComponent, SvgIconComponent} from '@tt/common-ui';
import {AvatarUploadComponent, ProfileHeaderComponent} from '../../ui';
import { ProfileService } from '@tt/data-access';

@Component({
   selector: 'app-settings-page',
   standalone: true,
   imports: [
      ProfileHeaderComponent,
      ReactiveFormsModule,
      AvatarUploadComponent,
      SvgIconComponent,
      StackInputComponent,
      AddressInputComponent
   ],
   templateUrl: './settings-page.component.html',
   styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
   fb = inject(FormBuilder);
   profileService = inject(ProfileService);
   router = inject(Router);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

   form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      description: [''],
      stack: [''],
      city: [null],
    });

   constructor() {
      effect(() => {
         //@ts-ignore
         this.form.patchValue({
            ...this.profileService.me()
         });
      });
   }

   onReset() {
      this.form.reset();
   }

   onCancel() {
      this.router.navigate(['/profile/me']);
   }

   onSave() {
     this.form.markAllAsTouched();
      this.form.updateValueAndValidity();

      if (this.form.invalid) return;

      if (this.avatarUploader.avatar) {
         firstValueFrom(
            this.profileService.uploadAvatar(
               this.avatarUploader.avatar
            )
         );
      }

      firstValueFrom(
         // @ts-ignore
         this.profileService.patchProfile({
            ...this.form.value
         })
      );
   }
}
