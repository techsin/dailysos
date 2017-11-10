const Upvote = require('./upvotes');
const User = require('./users');
const Link = require('./links');

module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Posts', {});

  Post.belongsTo(Link);
  Post.belongsTo(User);
  Post.hasMany(Upvote);

  return Post;
};