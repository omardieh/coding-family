import type { Server as SocketIOServer, Socket } from 'socket.io';
import type { Document, Types } from 'mongoose';

export interface IMessage {
  user: string;
  message: string;
}

export interface ISocket extends Socket {}

export interface IChatMessage extends Document {
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
