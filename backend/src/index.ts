import app from '@/App';
import { SERVER_CONNECT_MESSAGES as messages } from '@/constants';
import { DBService } from '@/services';
class Server {
  private db;
  constructor(
    public port: number,
    public host: string,
  ) {
    this.port = port;
    this.host = host;
    this.db = new DBService();
    this.runServer();
  }

  private async runServer() {
    try {
      await this.db.connectDB();
      app.listen(this.port, this.host, () => {
        console.info(messages.server.success);
      });
    } catch (error) {
      let errorMessage = 'unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
      process.exit(1);
    }
  }
}

if (!process.env.SERVER_PORT || !process.env.SERVER_HOST) {
  throw new Error('port must be a number, host must be a string');
}

new Server(Number(process.env.SERVER_PORT), process.env.SERVER_HOST);
