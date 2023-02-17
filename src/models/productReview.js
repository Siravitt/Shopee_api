module.exports = (sequelize, DataTypes) => {
  const ProductReview = sequelize.define(
    "ProductReview",
    {
      comment: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.ENUM([0, 1, 2, 3, 4, 5]),
      },
    },
    {
      underscored: true,
    }
  );
  return ProductReview;
};
