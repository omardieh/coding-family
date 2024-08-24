import { ChatMessage } from '@/models';
import { IMessage, ISocket, ISocketIOService } from '@/types';
import { Server as HttpServer } from 'http'; // Rename the import to avoid confusion
import { Server as SocketIOServer } from 'socket.io';

export class SocketIOService implements ISocketIOService {
  public io: SocketIOServer;

  constructor(server: HttpServer) {
    this.io = new SocketIOServer(server, {
      cors: { origin: process.env.CLIENT_URL || '*' },
    });

    this.configureSocketEvents();
  }

  public configureSocketEvents(): void {
    this.io.on('connection', (socket: ISocket) => {
      console.log('A user connected');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });

      this.sendExistingMessages(socket);

      socket.on('MessageToServer', (data: IMessage) => {
        this.handleIncomingMessage(data);
      });
    });
  }

  public async sendExistingMessages(socket: ISocket): Promise<void> {
    try {
      const messages = await ChatMessage.find().populate('user');
      socket.emit('MessagesFromServer', messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      socket.emit('Error', 'Failed to fetch messages.');
    }
  }

  public async handleIncomingMessage(data: IMessage): Promise<void> {
    try {
      const createdMessage = await ChatMessage.create(data);
      const populatedMessage = await createdMessage.populate('user');
      this.io.emit('MessageToClient', populatedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      this.io.emit('Error', 'Failed to save message.');
    }
  }
}
