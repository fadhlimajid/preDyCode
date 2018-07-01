'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Users.associate = function (models) {
    Users.hasMany(models.Posts, { foreignKey: 'user_id', as: 'posts' });
    Users.hasMany(models.Comments, { foreignKey: 'user_id', as: 'comments' });
  };
  return Users;
};