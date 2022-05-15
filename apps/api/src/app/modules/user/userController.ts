import { Sequelize, Op } from 'sequelize';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ResponseHandler } from '../../utils/ResponseHandler';
import { TokenManager } from '../../lib/TokenManager';
import { HashManager } from '../../lib/HashManager';
import { MailManager } from '../../lib/MailManager';
const tokenService = new TokenManager();
const hashManager = new HashManager();
const responseHandler = new ResponseHandler();
const mailManager = new MailManager();
export class UserController {
  private getModel(sequeLizeInstance: Sequelize, modelName: string) {
    return sequeLizeInstance.models[modelName];
  }

  private checkForModel(
    req: Request & { sequelize: { sequeLizeInstance: Sequelize } },
    res: Response
  ) {
    const { sequeLizeInstance } = req.sequelize;
    if (!sequeLizeInstance) {
      return responseHandler.sendResponse(res, 500, {
        error: 'something went wrong',
      });
    }
    return sequeLizeInstance;
  }
  async registerUser(
    req: Request & { sequelize: { sequeLizeInstance: Sequelize } },
    res: Response
  ) {
    try {
      const { sequeLizeInstance } = req.sequelize;
      if (!sequeLizeInstance) {
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
      payload.uid = uuidv4();
      payload.password = hashManager.createHashValue(payload.password);
      const newUser = await (await userModel.create(payload)).toJSON();
      const userSession = await sessionModel.create({
        userId: newUser.uid,
        isActive: true,
        sessionId: uuidv4(),
        deviceId: 'fakeDeviceForNow',
        platform: 'web', //for now
      });
      const token = await tokenService.createToken({
        uid: newUser.uid,
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

  async loginUser(
    req: Request & { sequelize: { sequeLizeInstance: Sequelize } },
    res: Response
  ) {
    try {
      const { sequeLizeInstance } = req.sequelize;
      if (!sequeLizeInstance) {
        return responseHandler.sendResponse(res, 500, {
          error: 'something went wrong',
        });
      }
      const userModel = sequeLizeInstance.models.user;
      const sessionModel = sequeLizeInstance.models.sessionHistory;
      const payload = req.body;

      const previousDetails = await (
        await userModel.findOne({
          where: { email: payload.email },
        })
      )?.toJSON();
      if (!previousDetails) {
        return responseHandler.sendResponse(res, 400, {
          message: 'user with this email id does not exists',
        });
      }
      // const findActiveSession = await (
      //   await sessionModel.findOne({
      //     where: {
      //       userId: previousDetails.uid,
      //       // uid: previousDetails.userId,
      //       isActive: true,
      //     },
      //   })
      // )?.toJSON();
      // if (findActiveSession) {
      //   return responseHandler.sendResponse(res, 401, {
      //     message: 'user already loggedin!',
      //   });
      // }
      const passwordCheck = hashManager.decryptHashValue(
        payload.password,
        previousDetails.password
      );
      if (!passwordCheck) {
        return responseHandler.sendResponse(res, 400, {
          message: 'password is not correct',
        });
      }
      const newSession = await sessionModel.create({
        sessionId: uuidv4(),
        userId: previousDetails.uid,
        // uid: previousDetails.userId,
        isActive: true,
        deviceId: 'fakeDeviceForNow',
        platform: 'web', //for now
      });
      const token = await tokenService.createToken({
        uid: previousDetails.uid,
        sessionId: uuidv4(),
        ...newSession.toJSON(),
      });
      return responseHandler.sendResponse(res, 200, {
        message: 'login success',
        token: token,
        ...previousDetails,
        ...newSession,
      });
    } catch (error) {
      return responseHandler.sendResponse(res, 400, { ...error });
    }
    // const model = this.getModelFromInstance(req.sequelize);
  }

  async getUserProfile(req: Request & { sequelize: Sequelize }, res: Response) {
    // const model = this.getModelFromInstance(req.sequelize);
  }

  async forgotPassword(
    req: Request & { sequelize: { sequeLizeInstance: Sequelize } },
    res: Response
  ) {
    try {
      const { sequeLizeInstance } = req.sequelize;
      if (!sequeLizeInstance) {
        return responseHandler.sendResponse(res, 500, {
          error: 'something went wrong',
        });
      }
      const userModel = sequeLizeInstance.models.user;
      const payload = req.body;

      const previousDetails = await (
        await userModel.findOne({
          where: { email: payload.email },
        })
      )?.toJSON();
      if (!previousDetails) {
        return responseHandler.sendResponse(res, 400, {
          message: 'user with this email id does not exists',
        });
      }
      const token = await tokenService.createToken({
        uid: previousDetails.uid,
      });
      await mailManager.sendMailViaSmtp({
        email: previousDetails.email,
        subject: 'Reset password link',
        html: `<h1>find the link to reset your password 
        <br> <br> <br>
        <a href="http://localhost:4200/reset-password?token=${token}" target="_blank"> please click the link to reset your password</a> 
        </h1>`,
      });
      return responseHandler.sendResponse(res, 200, {
        message:
          'mail is sent to the register email, please follow the link and reset your password',
      });
    } catch (error) {
      return responseHandler.sendResponse(res, 400, { ...error });
    }
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
      const sessionModel = sequeLizeInstance.models.sessionHistory;
      const data = await userModel.findAll();
      const sessionData = await sessionModel.findAll();
      return responseHandler.sendResponse(res, 200, {
        userList: data,
        sessionData,
      });
    } catch (error) {
      return responseHandler.sendResponse(res, 400, { ...error });
    }

    // const model = this.getModelFromInstance(req.sequelize);
  }

  async logout(
    req: Request & { sequelize: { sequeLizeInstance: Sequelize } },
    res
  ) {
    try {
      const { sequeLizeInstance } = req.sequelize;
      if (!sequeLizeInstance) {
        return responseHandler.sendResponse(res, 500, {
          error: 'something went wrong',
        });
      }
      const sessionModel = sequeLizeInstance.models.sessionHistory;
      if (!req?.headers?.authorization) {
        return responseHandler.sendResponse(res, 401, {
          message: 'no auth token found',
        });
      }
      const tokenData: any = await tokenService.decodeToken(
        req?.headers?.authorization
      );
      const sessionDetails = await sessionModel.findByPk(tokenData.sessionId);
      if (sessionDetails?.toJSON()) {
        await sessionDetails.destroy();
        return responseHandler.sendResponse(res, 200, {
          message: 'logout succesfully',
        });
      } else {
        return responseHandler.sendResponse(res, 400, {
          message: 'user is already logged out',
        });
      }
    } catch (error) {
      return responseHandler.sendResponse(res, 400, { ...error });
    }
  }
  async resetPasswordHandler(
    req: Request & { sequelize: { sequeLizeInstance: Sequelize } },
    res: Response
  ) {
    try {
      const { sequeLizeInstance } = req.sequelize;
      if (!sequeLizeInstance) {
        return responseHandler.sendResponse(res, 500, {
          error: 'something went wrong',
        });
      }
      const userModel = sequeLizeInstance.models.user;
      const sessionModel = sequeLizeInstance.models.sessionHistory;
      const payload = req.body;
      const decodeToken: any = await tokenService.decodeToken(payload.token);
      const userDetails = await (
        await userModel.findOne({
          where: {
            uid: decodeToken.uid,
          },
        })
      )?.toJSON();
      if (!userDetails) {
        return responseHandler.sendResponse(res, 400, {
          message: 'No user found with these details',
        });
      }
      const passHash = hashManager.createHashValue(payload.password);
      userDetails.password = passHash;
      await userModel.update(userDetails, {
        where: {
          uid: userDetails.uid,
        },
      });
      await sessionModel.destroy({
        where: {
          userId: userDetails.uid,
        },
      });
      return responseHandler.sendResponse(res, 200, {
        message: 'password reset succesfully, please login again',
      });
    } catch (error) {
      return responseHandler.sendResponse(res, 400, { ...error });
    }
  }
}
