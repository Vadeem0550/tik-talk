import {ChatConnectionWSParams, ChatWSService} from './chat-ws-service.interface';
import {WebSocketSubject} from 'rxjs/internal/observable/dom/WebSocketSubject';
import {ChatWSMessage} from './chat-ws-message.interface';
import {webSocket} from 'rxjs/webSocket';
import {finalize, Observable, tap} from 'rxjs';
import {AuthService} from '@tt/auth';
import {inject} from '@angular/core';

export class ChatWsRxService implements ChatWSService {
  #socket: WebSocketSubject<ChatWSMessage> | null = null

  #authService = inject(AuthService);

  connect(params: ChatConnectionWSParams): Observable<ChatWSMessage> {
    if (!this.#socket) {
      this.#socket = webSocket({
        url: params.url,
        protocol: [params.token]
      });
    }
    return this.#socket.asObservable()
      .pipe(tap(message => params.handleMessage(message)),
        finalize(() => {
          console.log('close connect')
          this.getRefreshToken(params)
        })
      );
  }

  disconnect(): void {
    this.#socket?.complete()
  }

  sendMessage(text: string, chatId: number): void {
    this.#socket?.next({
      text,
      chat_id: chatId,
    })
  }

  getRefreshToken(params: ChatConnectionWSParams) {
    this.#authService.refreshAuthToken()

    if (this.#authService.token) {
      this.#socket?.complete()
      this.connect({
        url: params.url,
        token: this.#authService.token,
        handleMessage: params.handleMessage,
      })
    }
  }

}
