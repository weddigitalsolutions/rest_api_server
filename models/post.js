module.exports = (sequelize, types) => {
  const Post = sequelize.define(
    "Post",
    {
      _id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: types.STRING(50),
        allowNull: false,
      },
      content: {
        type: types.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: types.STRING(100),
        allowNull: false,
      },
      updatedAt: {
        type: types.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "post",
      timestamps: true,
    }
  );

  return Post;
};
