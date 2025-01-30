import {ChatConnectionWSParams, ChatWSService} from '../interfaces/chat-ws-service.interface';

export class ChatWSNativeService implements ChatWSService {
  #socket: WebSocket | null = null;

  connect(params: ChatConnectionWSParams): void {
    if (this.#socket) return

    this.#socket = new WebSocket(params.url, [params.token])

    this.#socket.onmessage = (event: MessageEvent): void => {
      params.handleMessage(JSON.parse(event.data))
    }

    this.#socket.onclose = (): void => {
      console.log('close connect')
    }
  }


  sendMessage(text: string, chatId: number): void {
    this.#socket?.send(
      JSON.stringify({
        text,
        chat_id: chatId
      })
    )
  }

  disconnect(): void {
    this.#socket?.close()
  }

}
