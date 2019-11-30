'use strict';
module.exports = (sequelize, DataTypes) => {
  const card = sequelize.define('card', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  createdon: {
      type: DataTypes.DATE,
      allowNull: false
  }
  }, {
      freezeTableName: true,
      timestamps: false
  });
  card.associate = function(models) {
    // associations can be defined here
  };
  return card;
};