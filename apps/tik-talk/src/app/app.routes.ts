import { Routes } from '@angular/router';
import { FormsExperimentComponent } from '../lib/forms-experiment/forms-experiment.component';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import { ProfilePageComponent, SearchPageComponent, SettingsPageComponent } from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { LayoutComponent } from '@tt/layout';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffects, profileFeature } from '@tt/data-access';
import { CommunityEffects, communityFeature } from '../../../../libs/data-access/src/lib/community';
import { CommunityPageComponent } from '../../../../libs/communities/src';

export const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
        {
          path: 'search', component: SearchPageComponent,
          providers: [
            provideState(profileFeature),
            provideEffects(ProfileEffects)
          ]
        },
         { path: 'profile/:id', component: ProfilePageComponent },
         { path: 'settings', component: SettingsPageComponent },
        {
          path: 'communities', component: CommunityPageComponent,
          providers: [
            provideState(communityFeature),
            provideEffects(CommunityEffects)
          ]
        },
         {
            path: 'chats',
            loadChildren: () => chatsRoutes
         }
      ],
      canActivate: [canActivateAuth]
   },
   { path: 'login', component: LoginPageComponent },
   { path: 'experimental', component: FormsExperimentComponent }
];
