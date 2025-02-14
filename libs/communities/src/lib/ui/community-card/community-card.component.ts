import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '@tt/common-ui';
import { Community } from '@tt/data-access';

@Component({
  selector: 'community-card',
  standalone: true,
  imports: [CommonModule, ImgUrlPipe],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityCardComponent {
  @Input() public community!: Community;

  onSendMessage(id: unknown) {

  }

  subscribeCommunity(isJoined: boolean) {

  }
}

