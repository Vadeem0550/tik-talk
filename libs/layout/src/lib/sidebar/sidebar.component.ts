import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatsService, ProfileService } from '@tt/data-access';
import { AuthService } from '@tt/auth';

@Component({
   selector: 'app-sidebar',
   standalone: true,
   imports: [
      SvgIconComponent,
      RouterLink,
      NgForOf,
      AsyncPipe,
      JsonPipe,
      SubscriberCardComponent,
      ImgUrlPipe,
      RouterLinkActive
   ],
   templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  authService = inject(AuthService);

  unreadMessagesCount = this.chatsService.unreadMessages;
  subscribers$ = this.profileService.getSubscribersShortList();

   me = this.profileService.me;
   menuItems = [
      {
         label: 'Моя страница',
         icon: 'home',
         link: 'profile/me'
      },
      {
         label: 'Чаты',
         icon: 'chats',
         link: 'chats'
      },
      {
         label: 'Поиск',
         icon: 'search',
         link: 'search'
      },
     {
       label: 'Сообщества',
       icon: 'communities',
       link: 'communities'
     }
   ];

  reconnect() {
    this.authService.refreshAuthToken().pipe(takeUntilDestroyed()).subscribe({
      next: message => console.log('Websocket connect', message),
      error: err => console.log('Error connecting Websocket', err)
    })
  }

  constructor() {
    this.chatsService.connectWs().pipe(takeUntilDestroyed()).subscribe({
      error: err => console.log('Error connecting Websocket', err),
      complete: () => this.reconnect()
    })
  }

//   if(isUndreadMessage(message)){
//
// }

   ngOnInit() {
      firstValueFrom(this.profileService.getMe());
   }
}
