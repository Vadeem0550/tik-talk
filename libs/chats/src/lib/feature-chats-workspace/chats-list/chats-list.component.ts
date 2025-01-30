import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { ChatsService } from '@tt/data-access';

@Component({
   selector: 'app-chats-list',
   standalone: true,
   imports: [
      ChatsBtnComponent,
      AsyncPipe,
      RouterLink,
      RouterLinkActive,
      ReactiveFormsModule
   ],
   templateUrl: './chats-list.component.html',
   styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListComponent {
   chatsService = inject(ChatsService);

   filterChatsControl = new FormControl('');

   chats$ = this.chatsService.getMyChat().pipe(
      switchMap(chats => {
         return this.filterChatsControl.valueChanges.pipe(
            startWith(''),
            map(inputValue => {
               return chats.filter(chat => {
                  return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
                     .toLowerCase()
                     .includes(inputValue?.toLowerCase() ?? '');
               });
            })
         );
      })
   );
}
