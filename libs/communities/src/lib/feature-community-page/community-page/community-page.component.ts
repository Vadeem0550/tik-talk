import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'community-workspace',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityPageComponent {
  isHomePage = signal<boolean>(true);

}
