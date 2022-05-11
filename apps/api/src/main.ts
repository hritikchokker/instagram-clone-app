/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { app } from './app/app';
import { Database } from './app/utils/Database';
import { Logger } from './app/utils/Logging';
import { APP_MODELS } from './app/modules';
const port = process.env.port || 3333;
const logger = new Logger();
const server = app.listen(port, () => {
  logger.success(
    `*****************Listening at http://localhost:${port}/api***************`
  );
});

const makeDbConnection = async () => {
  try {
    const db = new Database();
    await db.connectToDb();
    await db.syncToDb();
    APP_MODELS(db.sequeLizeInstance);
    (app.request as any).sequelize = db;
    (app.request as any).Sequelize = db;
    db.showAllModels();
    logger.success(
      '*****************connected to db successfully****************'
    );
  } catch (error) {
    console.error('********', error, '*********');
    //
  }
};

makeDbConnection();
server.on('error', logger.error);
server.on('error', () => {
  process.exit();
});
