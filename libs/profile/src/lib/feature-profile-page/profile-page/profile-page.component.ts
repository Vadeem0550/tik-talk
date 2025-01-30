import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe, NgForOf} from '@angular/common';
import {ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';
import {ProfileHeaderComponent} from '../../ui';
import { ProfileService } from '@tt/data-access';
import { PostFeedComponent } from '@tt/posts';

@Component({
   selector: 'app-profile-page',
   standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    NgForOf,
    ImgUrlPipe,
    PostFeedComponent,
  ],
   templateUrl: './profile-page.component.html',
   styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
   profileService = inject(ProfileService);

   route = inject(ActivatedRoute);
   router = inject(Router);

   me$ = toObservable(this.profileService.me);
   subscribers$ = this.profileService.getSubscribersShortList(5);

   isMyPage = signal(false);

   profile$ = this.route.params.pipe(
      switchMap(({ id }) => {
         this.isMyPage.set(
            id === 'me' || id === this.profileService.me()?.id
         );
         if (id === 'me') return this.me$;
         return this.profileService.getAccount(id);
      })
   );

  // this.chatsService.createChat(userId)
   async sendMessage(userId: number) {
     this.router.navigate(['/chats', 'new'], {queryParams: {userId: userId}})
   }
}
