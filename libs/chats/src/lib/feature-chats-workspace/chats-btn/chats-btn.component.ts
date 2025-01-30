import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AvatarCircleComponent} from '@tt/common-ui';
import { LastMessageRes } from 'libs/data-access/src/lib/data-chats/interfaces/chats.interface';

@Component({
   selector: 'button[chats]',
   standalone: true,
   imports: [AvatarCircleComponent],
   templateUrl: './chats-btn.component.html',
   styleUrl: './chats-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsBtnComponent {
   chat = input<LastMessageRes>();
}
