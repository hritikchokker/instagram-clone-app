/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { app } from './app/app';
import { Database } from './app/utils/Database';
import { Logger } from './app/utils/Logging';
const port = process.env.port || 3333;
const logger = new Logger();
const server = app.listen(port, () => {
  logger.success(`*****************Listening at http://localhost:${port}/api***************`);
});

const makeDbConnection = async () => {
  try {
    const db = new Database();
    await db.connectToDb();
    await db.syncToDb();
    logger.success('*****************connected to db successfully****************');
  } catch (error) {
    //
  }
};

makeDbConnection();
server.on('error', logger.error);
server.on('error', () => {
  process.exit();
});
