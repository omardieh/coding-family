"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIOService = void 0;
const models_1 = require("@/models");
const socket_io_1 = require("socket.io");
class SocketIOService {
    constructor(server) {
        this.configureSocketEvents = () => {
            this.io.on('connection', (socket) => {
                console.log('A user connected');
                socket.on('disconnect', () => {
                    console.log('User disconnected');
                });
                this.sendExistingMessages(socket);
                socket.on('MessageToServer', (data) => {
                    this.handleIncomingMessage(data);
                });
            });
        };
        this.sendExistingMessages = async (socket) => {
            try {
                const messages = await models_1.ChatMessageModel.find().populate('user');
                socket.emit('MessagesFromServer', messages);
            }
            catch (error) {
                console.error('Error fetching messages:', error);
                socket.emit('Error', 'Failed to fetch messages.');
            }
        };
        this.handleIncomingMessage = async (data) => {
            try {
                const createdMessage = await models_1.ChatMessageModel.create(data);
                const populatedMessage = await createdMessage.populate('user');
                this.io.emit('MessageToClient', populatedMessage);
            }
            catch (error) {
                console.error('Error saving message:', error);
                this.io.emit('Error', 'Failed to save message.');
            }
        };
        this.io = new socket_io_1.Server(server, {
            cors: { origin: process.env.CLIENT_URL || '*' },
        });
        this.configureSocketEvents();
    }
}
exports.SocketIOService = SocketIOService;
