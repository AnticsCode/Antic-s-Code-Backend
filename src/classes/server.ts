import express from 'express';
import { PORT } from '../config/server.config';

export default class Server {
  public app: express.Application;
  public port = PORT;

  constructor() {
    this.app = express();
    this.app.set('port', this.port);
  }

  public listen(callback: () => void) {
    this.app.listen(this.app.get('port'), callback);
  }
}