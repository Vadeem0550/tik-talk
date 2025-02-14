import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-community-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-filters.component.html',
  styleUrl: './community-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityFiltersComponent {}
