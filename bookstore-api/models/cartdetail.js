'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Cart, {
        as: 'cart', 
        foreignKey: 'cartId'
      } );

      this.belongsTo(models.Book, {
        as: 'book', 
        foreignKey: 'bookId'
      } );
    }
  };
  CartDetail.init({
    quantity: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount:{
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CartDetail',
  });
  return CartDetail;
};