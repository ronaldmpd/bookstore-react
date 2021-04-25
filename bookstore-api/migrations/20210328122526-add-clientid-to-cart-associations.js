'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Carts", "clientId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Clients",
        },
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Carts", "clientId");  
  }
};
