'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todo', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    done: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    assignedby: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    assignedto: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    todo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(300),
        allowNul: false
    },
    projectid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('todos');
  }
};