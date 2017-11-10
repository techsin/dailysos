const User = require(./users);
const Post = require(./post);
module.exports = (sequelize, DataTypes) => {
  var Upvotes = sequelize.define('Upvotes', {});
  Upvotes.belongsTo(User);
  Upvotes.belongsTo(Post);
  
  return Upvotes;
};