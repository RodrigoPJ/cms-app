export class DataChat {

  clientID: string;
  public hasConnection: boolean = false;
  public socketConnection: WebSocket | null = null;

  constructor(clientId: string) {
    this.clientID = clientId;
    try {
      const socket = new WebSocket(`/ws/chat/${clientId}`);
      this.socketConnection = socket;
      this.hasConnection = true;
    } catch {
      console.log('No socket connection');
    }
  }

  sendMessage() {

  }

  createConversation() {

  }

  getConversations() {

  }
}
