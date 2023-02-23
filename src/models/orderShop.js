module.exports = (sequelize, DataTypes) => {
  const OrderShop = sequelize.define(
    "OrderShop",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  OrderShop.associate = (db) => {
    OrderShop.belongsTo(db.Shop, {
      foreignKey: {
        name: "shopId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    OrderShop.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    OrderShop.hasMany(db.OrderItem, {
      foreignKey: {
        name: "orderShopId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return OrderShop;
};
