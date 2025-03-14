import colors from 'colors';
import { Application } from 'express';
import morgan from 'morgan';

export class LoggingConfig {
  constructor(private app: Application) {
    this.app = app;
    this.configureMorgan();
  }
  private configureMorgan = (): void => {
    // TODO: configure Morgan for logging
    // Using Morgan for HTTP request logging in Node.js :
    // https://www.geeksforgeeks.org/what-is-morgan-in-node-js/
    this.app.use(
      morgan((tokens, req, res) =>
        [
          '🌍',
          colors.bgBlack.bold(` REQUEST `),
          tokens.method(req, res) || '',
          colors.green.bold(tokens.status(req, res) || ''),
          colors.bgGreen.bold(tokens.url(req, res) || ''),
          colors.green.bold((tokens['response-time'](req, res) || '') + ' ms'),
          colors.magenta.bold('@ ' + (tokens.date(req, res) || '')),
          // "\n",
          // colors.green("from " + tokens["remote-addr"](req, res) || ""),
          // colors.yellow.bold("from " + (tokens.referrer(req, res) || "")),
          // colors.blue(tokens["user-agent"](req, res) || ""),
        ].join(' '),
      ),
    );
  };
}
