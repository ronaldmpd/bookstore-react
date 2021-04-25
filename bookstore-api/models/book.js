'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Author, {
        as: 'author', 
        foreignKey: 'authorId'
      } );

      this.hasMany(models.CartDetail, {
        as: 'carts',
        foreignKey: 'bookId'
      })

    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};