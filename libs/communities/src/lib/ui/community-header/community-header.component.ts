import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'tt-community-header',
  standalone: true,
  imports: [CommonModule, AvatarCircleComponent],
  templateUrl: './community-header.component.html',
  styleUrl: './community-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityHeaderComponent {
}
