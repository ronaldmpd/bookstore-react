'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Client, {
        as: 'client', 
        foreignKey: 'clientId'
      } );

      this.hasMany(models.CartDetail, {
        as: 'cartdetails',
        foreignKey: 'cartId'
      })
    }
  };
  Cart.init({
    total:{ 
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};