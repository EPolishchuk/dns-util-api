import express from 'express';
import { whois, dig, nmap, ping } from './routes';

export const createApp = () => {
  const app = express();

  app.use(whois);

  app.use(dig);

  app.use(nmap);

  app.use(ping);

  return app;
};
