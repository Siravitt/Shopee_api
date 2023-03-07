module.exports = (sequelize, DataTypes) => {
  const OrderShop = sequelize.define(
    "OrderShop",
    {
      status: {
        type: DataTypes.ENUM(["PENDING", "SHIPPING", "SUCCESS", "CANCELLED"]),
        defaultValue: "PENDING",
      },
      totalPrice: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      shippingPrice: {
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

  OrderShop.associate = (db) => {
    OrderShop.belongsTo(db.Shop, {
      foreignKey: {
        name: "shopId",
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
