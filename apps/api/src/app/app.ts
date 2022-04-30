import * as express from 'express';
import { router } from '../app/routes';
export const app = express();

app.use(router);
