import { ChatMessageModel } from '@/models';
import { IMessage, ISocket, ISocketIOService } from '@/types';
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

export class SocketIOService implements ISocketIOService {
  public io: SocketIOServer;
  constructor(server: HttpServer) {
    const clientURLs = (process.env.CLIENT_URL || '').split(', ');
    const corsOptions = {
      origin: clientURLs,
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-XSRF-TOKEN'],
    };

    this.io = new SocketIOServer(server, {
      cors: corsOptions,
      transports: ['polling', 'websocket'],
      pingTimeout: 60000,
      pingInterval: 25000,
    });
    this.configureSocketEvents();
  }
  configureSocketEvents = (): void => {
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
  };
  sendExistingMessages = async (socket: ISocket): Promise<void> => {
    try {
      const messages = await ChatMessageModel.find().populate('user');
      socket.emit('MessagesFromServer', messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      socket.emit('Error', 'Failed to fetch messages.');
    }
  };
  handleIncomingMessage = async (data: IMessage): Promise<void> => {
    try {
      const createdMessage = await ChatMessageModel.create(data);
      const populatedMessage = await createdMessage.populate('user');
      this.io.emit('MessageToClient', populatedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      this.io.emit('Error', 'Failed to save message.');
    }
  };
}
