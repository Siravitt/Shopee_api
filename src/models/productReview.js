module.exports = (sequelize, DataTypes) => {
  const ProductReview = sequelize.define(
    "ProductReview",
    {
      comment: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.ENUM(["1", "2", "3", "4", "5"]),
      },
    },
    {
      underscored: true,
    }
  );

  ProductReview.associate = (db) => {
    ProductReview.belongsTo(db.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return ProductReview;
};
