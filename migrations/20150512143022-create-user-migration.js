'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface
        .createTable('Users', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
          username: Sequelize.STRING,
          hash: Sequelize.STRING,
          salt: Sequelize.STRING,
          favoriteColor: Sequelize.STRING,
          resetPasswordKey: Sequelize.STRING,
          activationKey: Sequelize.STRING
      });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
