import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-community-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-header.component.html',
  styleUrl: './community-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityHeaderComponent {}
