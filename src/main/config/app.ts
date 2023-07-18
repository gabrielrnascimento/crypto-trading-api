import express, { type Express } from 'express';
import setupRoutes from './routes';
import setupMiddlewares from './middlewares';

export const setupApp = (): Express => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  return app;
};
