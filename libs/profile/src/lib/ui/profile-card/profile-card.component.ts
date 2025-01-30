import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { Router } from '@angular/router';
import { Profile } from '@tt/data-access';

@Component({
   selector: 'app-profile-card',
   standalone: true,
   imports: [ImgUrlPipe, SvgIconComponent],
   templateUrl: './profile-card.component.html',
   styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
   @Input() public profile!: Profile;
  router = inject(Router)

  async onSendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], {queryParams: {userId: userId}})
  }
}
