module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      totalPrice: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      shipping: {
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

  Order.associate = (db) => {
    Order.hasMany(db.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Order.belongsTo(db.Address, {
      foreignKey: {
        name: "addressId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Order.hasOne(db.Payment, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Order;
};
