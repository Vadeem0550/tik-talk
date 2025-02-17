import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '@tt/common-ui';
import { Community } from 'libs/data-access/src/lib/community/interfaces/community.interface';

@Component({
  selector: 'tt-community-card',
  standalone: true,
  imports: [CommonModule, ImgUrlPipe],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent {
  @Input() public community!: Community;

  isJoined = signal<boolean>(false);

  subscribeCommunity() {
    this.isJoined.set(!this.isJoined());
  }

  onSendMessage() {};
}
