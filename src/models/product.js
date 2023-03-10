module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: DataTypes.TEXT,
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      quantityAvailable: {
        type: DataTypes.INTEGER,
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

  Product.associate = (db) => {
    Product.hasMany(db.ProductImage, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    Product.belongsTo(db.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Product.hasMany(db.Cart, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Product.hasMany(db.ProductReview, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Product.belongsTo(db.Shop, {
      foreignKey: {
        name: "shopId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Product.hasMany(db.OrderItem, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Product;
};
