'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("CartDetails", "cartId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Carts",
        },
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("CartDetails", "cartId");
  }
};
