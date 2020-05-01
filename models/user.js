module.exports = (sequelize, types) => {
  const User = sequelize.define(
    "User",
    {
      _id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: types.STRING(100),
        allowNull: false,
      },
      password: {
        type: types.STRING(60),
        allowNull: false,
      },
      status: {
        type: types.STRING(20),
        defaultValue: "I am new",
        allowNull: false,
      },
      createdAt: {
        type: types.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: types.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      timestamps: true,
    }
  );

  return User;
};
