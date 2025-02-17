import { createFeature, createReducer, on } from '@ngrx/store';
import { Community } from '../interfaces/community.interface';
import { communityActions } from './actions';

export interface CommunityState {
  communities: Community[];
  communityFilters: Record<string, any>;
}

export const initialState: CommunityState = {
  communities: [],
  communityFilters: {}
};

export const communityFeature = createFeature({
  name: 'community',
  reducer: createReducer(
    initialState,
    on(communityActions.communityLoaded, (state, payload) => {
      return {
        ...state,
        communities: payload.communities
      };
    })
  )
});
