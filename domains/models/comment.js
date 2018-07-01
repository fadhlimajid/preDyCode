'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comments = sequelize.define('Comments', {
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {});
  Comments.associate = function (models) {
    Comments.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    Comments.belongsTo(models.Posts, { foreignKey: 'post_id', as: 'post' });
  };
  return Comments;
};