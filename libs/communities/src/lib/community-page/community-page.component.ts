import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityService } from '@tt/data-access';
import { CommunityCardComponent } from '../ui/community-card/community-card.component';
import { firstValueFrom } from 'rxjs';
import { CommunityFiltersComponent } from '../community-filters/community-filters.component';

@Component({
  selector: 'community-page',
  standalone: true,
  imports: [CommonModule, CommunityCardComponent, CommunityFiltersComponent],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityPageComponent implements OnInit {
  communityService = inject(CommunityService);

  communities = this.communityService.community;

  ngOnInit() {
    firstValueFrom(this.communityService.getCommunity());
  }
}
