import { setEnv } from '@/utils';
setEnv();

import app from '@/App';
import { SERVER_CONNECT_MESSAGES as messages } from '@/constants';
import { DBService, SocketIOService } from '@/services';
import { createServer } from 'http';

class Server {
  private db: DBService;
  private httpServer;
  constructor(
    public port: number,
    public host: string,
  ) {
    this.port = port;
    this.host = host;
    this.db = new DBService();
    this.httpServer = createServer(app);
    new SocketIOService(this.httpServer);
    this.runServer();
  }

  private runServer = async () => {
    try {
      await this.db.connectDB();
      this.httpServer.listen(this.port, this.host, () => console.info(messages.server.success));
    } catch (error) {
      let errorMessage = 'unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
      process.exit(1);
    }
  };
}

const { SERVER_HOST: host } = process.env;
const port = Number(process.env.SERVER_PORT);

if (!port || !host) {
  throw new Error('port must be a number, host must be a string');
}

new Server(port, host);
