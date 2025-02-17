import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityFiltersComponent } from '../communuty-filters/community-filters.component';
import { CommunityCardComponent } from '../../ui';
import { Store } from '@ngrx/store';
import { selectFilteredCommunities } from '../../../../../data-access/src/lib/community';

@Component({
  selector: 'tt-search-page',
  standalone: true,
  imports: [CommonModule, CommunityFiltersComponent, CommunityCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  communityStore = inject(Store);

  communities = this.communityStore.selectSignal(selectFilteredCommunities);
}
