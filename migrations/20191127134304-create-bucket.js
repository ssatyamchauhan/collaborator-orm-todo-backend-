'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bucket', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    todoid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    filename: {
        type: Sequelize.STRING,
        alloNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('buckets');
  }
};