import { Sequelize } from 'sequelize';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ResponseHandler } from '../../utils/ResponseHandler';
import { TokenManager } from '../../lib/TokenManager';
import { HashManager } from '../../lib/HashManager';
const tokenService = new TokenManager();
const hashManager = new HashManager();
const responseHandler = new ResponseHandler();
export class UserController {
  async registerUser(
    req: Request & { sequelize: { sequeLizeInstance: Sequelize } },
    res: Response
  ) {
    try {
      const { sequeLizeInstance } = req.sequelize;
      if (!req?.sequelize) {
        return responseHandler.sendResponse(res, 500, {
          error: 'something went wrong',
        });
      }
      const userModel = sequeLizeInstance.models.user;
      const sessionModel = sequeLizeInstance.models.sessionHistory;
      const payload = req.body;
      const previousDetails = await userModel.findOne({
        where: { email: payload.email },
      });
      if (previousDetails) {
        return responseHandler.sendResponse(res, 400, {
          message: 'user with this email already exists',
        });
      }
      payload.userId = uuidv4();
      payload.password = hashManager.createHashValue(payload.password);
      const newUser = await (await userModel.create(payload)).toJSON();
      const userSession = await sessionModel.create({
        userId: newUser.userId,
        isActive: true,
        sessionId: uuidv4(),
        deviceId: 'fakeDeviceForNow',
        platform: 'web', //for now
      });
      const token = await tokenService.createToken({
        userId: newUser.userId,
        sessionId: uuidv4(),
        ...userSession.toJSON(),
      });
      // const allUser = await userModel.findAll();
      return responseHandler.sendResponse(res, 201, {
        token,
        message: 'account created succesfully',
        ...newUser,
        ...userSession.toJSON(),
      });
    } catch (error) {
      console.log(error, 'errorr');
      return responseHandler.sendResponse(res, 400, { ...error });
    }
  }

  async loginUser(req: Request & { sequelize: Sequelize }, res: Response) {
    // const model = this.getModelFromInstance(req.sequelize);
  }

  async getUserProfile(req: Request & { sequelize: Sequelize }, res: Response) {
    // const model = this.getModelFromInstance(req.sequelize);
  }

  async forgotPassword(req: Request & { sequelize: Sequelize }, res: Response) {
    // const model = this.getModelFromInstance(req.sequelize);
  }

  async userList(
    req: Request & { sequelize: { sequeLizeInstance: Sequelize } },
    res: Response
  ) {
    try {
      const { sequeLizeInstance } = req.sequelize;
      if (!req?.sequelize) {
        return responseHandler.sendResponse(res, 500, {
          error: 'something went wrong',
        });
      }
      const userModel = sequeLizeInstance.models.user;
      const data = await userModel.findAll();
      return responseHandler.sendResponse(res, 200, {
        userList: data,
      });
    } catch (error) {
      return responseHandler.sendResponse(res, 400, { ...error });
    }

    // const model = this.getModelFromInstance(req.sequelize);
  }
}
