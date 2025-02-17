import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from '../../feature-community-list';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityHeaderComponent } from '../../ui';
import { SvgIconComponent } from '@tt/common-ui';
import { CommunityService } from 'libs/data-access/src/lib/community/services/community.service';

@Component({
  selector: 'tt-community-page',
  standalone: true,
  imports: [CommonModule, SearchPageComponent, CommunityHeaderComponent, SvgIconComponent],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityPageComponent {
  communityService = inject(CommunityService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  isHomePage = signal(false);

  // communities$ = toObservable(this.communityService)

  constructor() {
    // community$ = this.route.params.pipe(
    //   switchMap(({ id }) => {
    //     this.isHomePage.set(id === 'community' || id === this.communityService.me() ? id);
    //     if (id === 'community') return this.communities$;
    //
    //     return this.communityService.getCommunities(id);
    //   })
    // );
  }

  toEdit() {

  }
}
