'use strict';
module.exports = (sequelize, DataTypes) => {
  const bucket = sequelize.define('bucket', {
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
      type: DataTypes.STRING,
      allowNull: false
  },
  filename: {
      type: DataTypes.STRING,
      alloNull: false
  },
  location: {
      type: DataTypes.STRING,
      allowNull: false
  }
  },
    {
      freezeTableName: true,
      timestamps: false
    });
  bucket.associate = function(models) {
    // associations can be defined here
  };
  return bucket;
};