import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {ChatWorkspaceMessageComponent} from './chat-workspace-message/chat-workspace-message.component';
import {firstValueFrom} from 'rxjs';
import { MessageInputComponent} from '@tt/chats';
import { Chat, ChatsService } from '@tt/data-access';

@Component({
   selector: 'app-chat-workspace-messages-wrapper',
   standalone: true,
   imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
   templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceMessagesWrapperComponent {
   chatsService = inject(ChatsService);

   chat = input.required<Chat>();

   messages = this.chatsService.activeChatMessages;

   async onSendMessage(messageText: string) {
     this.chatsService.wsAdapter.sendMessage(
       messageText,
       this.chat().id
     )
     // await firstValueFrom(
     //    this.chatsService.sendMessage(this.chat().id, messageText)
     // );
      await firstValueFrom(
         this.chatsService.getChatById(this.chat().id)
      );
   }
}
