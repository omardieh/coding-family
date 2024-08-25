import type { Document, Types } from 'mongoose';
import type { Socket, Server as SocketIOServer } from 'socket.io';

export interface IMessage {
  user: string;
  message: string;
}

export interface ISocket extends Socket {}

export interface IChatMessageModel extends Document {
  user: Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISocketIOService {
  io: SocketIOServer;
  configureSocketEvents(): void;
  sendExistingMessages(socket: ISocket): Promise<void>;
  handleIncomingMessage(data: IMessage): Promise<void>;
}
