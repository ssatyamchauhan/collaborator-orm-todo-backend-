'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
  },
  todoid: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  name: {
      type: DataTypes.STRING(),
      allowNull: false
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false
  },
  comment: {
      type: DataTypes.STRING,
      allowNull: false
  },
  parentid: {
      type: DataTypes.INTEGER
  }
  }, {
      freezeTableName: true,
      timestamps: false
  });
  comments.associate = function(models) {
    // associations can be defined here
  };
  return comments;
};