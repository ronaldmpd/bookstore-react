'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn("Books", "authorId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Authors",
        },
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
    });

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeColumn("Books", "authorId");
  }
};
