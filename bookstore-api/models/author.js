'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Book, {
        as: 'books',
        foreignKey: 'authorId'
      })
    }
  };
  Author.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age:{ 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nationality: { 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Boliviano'
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};