module.exports = (sequelize, dataTypes) => {
    const Transaction = sequelize.define(
      "Transaction",
      {
        transactionId: {
          type: dataTypes.STRING,
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
  
    Transaction.associate = (db) => {
      Transaction.belongsTo(db.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
        onDelete: "RESTRICT",
      });
    };
  
    return Transaction;
  };
  