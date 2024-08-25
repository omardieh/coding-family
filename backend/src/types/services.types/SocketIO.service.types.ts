import type { Socket, Server as SocketIOServer } from 'socket.io';

export interface IMessage {
  user: string;
  message: string;
}

export interface ISocket extends Socket {
  userId?: string;
}

export interface ISocketIOService {
  io: SocketIOServer;
  configureSocketEvents(): void;
  sendExistingMessages(socket: ISocket): Promise<void>;
  handleIncomingMessage(data: IMessage): Promise<void>;
}
