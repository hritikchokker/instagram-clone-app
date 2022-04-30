import { Sequelize } from 'sequelize';

export class Database {
  sequeLizeInstance: Sequelize;
  async connectToDb() {
    try {
      const sequelize = new Sequelize('instagram_clone', 'postgres', '1234', {
        host: 'localhost',
        dialect: 'postgres',
        logging: console.log,
      });
      this.sequeLizeInstance = sequelize;
      return sequelize;
    } catch (error) {
      Promise.reject(error);
    }
  }
  async verifyConnection(): Promise<unknown> {
    return this.sequeLizeInstance.authenticate();
  }
  async syncToDb(force = false) {
    try {
      await this.sequeLizeInstance.sync({ force });
    } catch (e) {
      console.log('failed to sync');
    }
  }
}
