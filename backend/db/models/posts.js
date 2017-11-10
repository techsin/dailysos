const Upvote = require('./upvotes');
const User = require('./users');
const Link = require('./links');

module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define('Posts', {});
  return Posts;
};
