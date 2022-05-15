import { Sequelize } from 'sequelize';
import { UserModel, SessionModel } from '../models';

export class Database {
  sequeLizeInstance: Sequelize;
  async connectToDb() {
    try {
      const sequelize = new Sequelize('instagram_clone', 'postgres', '12345', {
        host: 'localhost',
        dialect: 'postgres',
        logging: console.log,
      });
      this.sequeLizeInstance = sequelize;
      this.sequeLizeInstance.models['user'] = UserModel(sequelize);
      this.sequeLizeInstance.models['sessionHistory'] = SessionModel(sequelize);
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

  async syncAllModels() {
    const promiseModel = [];
    Object.keys(this.sequeLizeInstance.models).forEach((model) => {
      promiseModel.push(this.sequeLizeInstance.models[model].sync());
    });
    await Promise.all(promiseModel);
  }

  addModels(arr: Array<{ modelName: string; modelValue: unknown }>): void {
    arr.forEach((model) => {
      this.addModel(model.modelName, model.modelValue);
    });
  }

  private addModel(modelName, model: any): void {
    this.sequeLizeInstance.define(modelName, model);
  }
  private getModelInstance(modelName: string) {
    return this.sequeLizeInstance.models[modelName];
  }

  setAssociation(from: string, to: string): void {
    /**
     * @example
     * from = user
     * to = sessionHistory
     * user hasMany sessions
     */
    const fromModel = this.getModelInstance(from); // user
    const toModel = this.getModelInstance(to); //session
    console.log(from, 'from', to, 'to');
    // toModel.belongsTo(fromModel);
    fromModel.hasMany(toModel, { foreignKey: 'userId' });
    toModel.belongsTo(fromModel, { foreignKey: 'userId' });
    // this.sequeLizeInstance.getQueryInterface().addConstraint(from, {
    //   fields: ['userId'],
    //   type: 'foreign key',
    //   name: 'userId',
    //   references: {
    //     table: 'sessionHistory',
    //     field: 'userId',
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade',
    // });
    // toModel.hasMany(fromModel, {
    //   foreignKey: 'sessionId',
    // });
    // fromModel.belongsTo(toModel, {
    //   foreignKey: 'sessionId',
    // });
  }
  showAllModels(): void {
    console.log(this.sequeLizeInstance.models, '******** ALL Models');
  }

  async dropTable(tableNames: Array<string>) {
    const pr = [];
    tableNames?.forEach((table) => {
      pr.push(this.getModelInstance(table).drop());
    });
    return Promise.all(pr);
  }
}
