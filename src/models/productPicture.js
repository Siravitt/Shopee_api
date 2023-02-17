module.exports = (sequelize, DataTypes) => {
  const ProductPicture = sequelize.define(
    "ProductPicture",
    {
      image: DataTypes.STRING,
      isMain: {
        type: DataTypes.BOOLEAN,
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
  return ProductPicture;
};
