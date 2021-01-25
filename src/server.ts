import '@config/env';
import 'reflect-metadata';
import express from 'express';
import middlewares from '@config/express';
import routes from '@config/routes';
import { createConnection } from 'typeorm';

class Server {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT);
    this.init();
  }

  async init() {
    try {
      await createConnection();

      middlewares(this.app);
      routes(this.app);

      this.app.listen(this.port, () => {
        console.info(`Listening at http://localhost:${this.port}/`);
      });
    } catch (error) {
      console.error({ error });
    }
  }
}

export default new Server();