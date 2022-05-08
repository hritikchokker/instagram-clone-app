import { DataTypes, Sequelize } from 'sequelize';

export const UserModel = (sequelize: Sequelize) => {
  return sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 4,
          max: 30,
        },
      },
      middleName: {
        type: DataTypes.STRING,
        validate: {
          min: 4,
          max: 30,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 4,
          max: 30,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
          max: 25,
        },
      },
      status: {
        type: DataTypes.STRING,
        values: ['active', 'blocked', 'inactive', 'deleted'],
        defaultValue: 'active',
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      modelName: 'User',
    }
  );
};
