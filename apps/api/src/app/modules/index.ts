import { UserModel } from './user/userModel';
import { SessionModel } from './sessionHistory/sessionModel';
export const APP_MODELS = (sequelize) => {
  UserModel(sequelize);
  SessionModel(sequelize);
};
