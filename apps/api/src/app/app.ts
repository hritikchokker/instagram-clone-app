import * as express from 'express';
import * as cors from 'cors';
import { router } from '../app/routes';
import { Sequelize } from 'sequelize/types';

export const app = express();
let databaseInstance: Sequelize;

export const updateDatabaseInstance = (db) => {
  databaseInstance = db;
};
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  (req as any).sequelize = databaseInstance;
  (req as any).Sequelize = databaseInstance;
  next();
});
app.use(router);
