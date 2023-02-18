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

  ProductPicture.associate = (db) => {
    ProductPicture.belongsTo(db.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return ProductPicture;
};
