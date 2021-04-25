'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("CartDetails", "bookId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Books",
        },
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("CartDetails", "bookId");
  }
};
