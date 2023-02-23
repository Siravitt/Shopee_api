module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    }
  );

  OrderItem.associate = (db) => {
    OrderItem.belongsTo(db.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    OrderItem.belongsTo(db.OrderShop, {
      foreignKey: {
        name: "orderShopId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return OrderItem;
};
