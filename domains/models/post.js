'use strict';
module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define('Posts', {
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Posts.associate = function (models) {
    Posts.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    Posts.hasMany(models.Comments, { foreignKey: 'post_id', as: 'comments' });
  };
  return Posts;
};