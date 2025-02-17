import { createActionGroup, props } from '@ngrx/store';
import { Community } from '../interfaces/community.interface';

export const communityActions = createActionGroup({
  source: 'community',
  events: {
    'filter events': props<{ filters: Record<string, any> }>(),
    'community loaded': props<{ communities: Community[] }>()
  }
});
