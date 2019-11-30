'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
  },
  done: {
      type: DataTypes.BOOLEAN,
      allowNull: false
  },
  assignedby: {
      type: DataTypes.STRING(300),
      allowNull: false
  },
  assignedto: {
      type: DataTypes.STRING(300),
      allowNull: false
  },
  todo: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  description: {
      type: DataTypes.STRING(300),
      allowNul: false
  },
  projectid: {
      type: DataTypes.INTEGER,
      allowNull: false
  }
  }, {
      freezeTableName: true,
      timestamps: false
  });
  todo.associate = function(models) {
    // associations can be defined here
  };
  return todo;
};