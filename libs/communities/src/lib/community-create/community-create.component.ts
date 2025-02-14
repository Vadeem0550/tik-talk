import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'community-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-create.component.html',
  styleUrl: './community-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCreateComponent {}
