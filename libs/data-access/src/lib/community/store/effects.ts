import { inject, Injectable } from '@angular/core';
import { CommunityService } from '../services/community.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { communityActions } from './actions';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommunityEffects {
  communityService = inject(CommunityService);
  actions$ = inject(Actions);
  store = inject(Store);

  filteredCommunities = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        communityActions.filterEvents
      ),
      switchMap(({ filters }) => {
        return this.communityService.filterCommunities(filters);
      }),
      map(res => communityActions.communityLoaded({ communities: res.items }))
    );
  });
}
