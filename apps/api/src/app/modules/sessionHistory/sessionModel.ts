import { DataTypes } from 'sequelize';

export const SessionModel = (sequelize) => {
  return sequelize.define(
    'sessionHistory',
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deviceId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ['ios', 'android', 'web'],
      },
    },
    {
      timestamps: true,
    }
  );
};
