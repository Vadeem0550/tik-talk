import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Chat, LastMessageRes, Message} from '../interfaces/chats.interface';
import {map, Observable} from 'rxjs';
import {AuthService} from '@tt/auth';
import {ChatWSMessage} from '../interfaces/chat-ws-message.interface';
import {isNewMessage, isUnreadMessage} from '../interfaces/type-guards';
import {ChatWsRxService} from '../interfaces/chat-ws-rxjs.service';
import {ChatWSService} from '../interfaces/chat-ws-service.interface';
import { ProfileService } from '@tt/data-access';

@Injectable({
   providedIn: 'root'
})
export class ChatsService {
  http = inject(HttpClient);
  #authService = inject(AuthService);
  unreadMessages = signal(0)
  me = inject(ProfileService).me;

  // wsAdapter: ChatWSService = new ChatWsNativeService()
  wsAdapter: ChatWSService = new ChatWsRxService()

   activeChatMessages = signal<Message[]>([]);

   baseApiUrl = 'https://icherniakov.ru/yt-course/';

   chatsUrl = `${this.baseApiUrl}chat/`;
   messageUrl = `${this.baseApiUrl}message/`;

  connectWs() {
    return this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage,
    }) as Observable<ChatWSMessage>
  }

  handleWSMessage = (message: ChatWSMessage) => {
    if (!('action' in message)) return

    if (isUnreadMessage(message)) {
      this.unreadMessages.set(message.data.count)
    }

    if (isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chatId,
          text: message.data.message,
          createdAt: message.data.createdAt,
          isRead: false,
          isMine: false,
        }
      ])
    }
  }

   createChat(userId: number) {
      return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
   }

   getMyChat() {
      return this.http.get<LastMessageRes[]>(
         `${this.chatsUrl}get_my_chats/`
      );
   }

   getChatById(chatId: number) {
      return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
         map(chat => {
            const patchMessages = chat.messages.map(message => {
               return {
                  ...message,
                  user:
                     chat.userFirst.id === message.userFromId
                        ? chat.userFirst
                        : chat.userSecond,
                  isMine: message.userFromId === this.me()!.id
               };
            });

            this.activeChatMessages.set(patchMessages);

            return {
               ...chat,
               companion:
                  chat.userFirst.id === this.me()!.id
                     ? chat.userSecond
                     : chat.userFirst,
               messages: patchMessages
            };
         })
      );
   }

   sendMessage(chatId: number, message: string) {
      return this.http.post(
         `${this.messageUrl}send/${chatId}`,
         {},
         {
            params: {
               message
            }
         }
      );
   }
}
