import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ProfileCardComponent} from '../../ui';
import {ProfileFiltersComponent} from '../profile-filters/profile-filters.component';
import {Store} from '@ngrx/store';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {InfiniteScrollTriggerComponent} from '@tt/common-ui';
import {WaIntersectionObservee, WaIntersectionObserverDirective} from '@ng-web-apis/intersection-observer';
import {firstValueFrom, scan, Subject} from 'rxjs';
import { Profile, profileActions, ProfileService, selectFilteredProfiles } from '@tt/data-access';

@Component({
   selector: 'app-search-page',
   standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    AsyncPipe,
    InfiniteScrollTriggerComponent,
    WaIntersectionObserverDirective,
    WaIntersectionObservee,
    InfiniteScrollDirective
  ],
   templateUrl: './search-page.component.html',
   styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit {
  store = inject(Store);
  profileService = inject(ProfileService);
  profiles = this.store.selectSignal(selectFilteredProfiles);


  // TODO реализация скролла с rxjs
  profilesSubject$ = new Subject<Profile[]>()

  infiniteProfiles$ = this.profilesSubject$
    .pipe(
      scan((acc, curr) => {
        return acc.concat(curr) as Profile[]
      }, [] as Profile[])
    )

  page = 0;

  ngOnInit() {
    // this.getNextPage()
  }

  async getNextPage() {
    this.page += 1
    const res = await firstValueFrom(this.profileService.filterProfiles(
      {page: this.page}))

    this.profilesSubject$.next(res.items)
  }


  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if (!entries.length) return;

    if (entries[0].intersectionRatio > 0) {
      this.timeToFetch()
    }
  }

  onScroll() {
    console.log('scroll')
    this.timeToFetch()
    this.getNextPage()
  }
}
