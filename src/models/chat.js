module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      message: {
        type: DataTypes.STRING,
      },
      messageImage: {
        type: DataTypes.STRING,
      },
      sender: {
        type: DataTypes.ENUM(["shop", "user"]),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Chat.associate = (db) => {
    Chat.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Chat.belongsTo(db.Shop, {
      foreignKey: {
        name: "shopId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Chat;
};
