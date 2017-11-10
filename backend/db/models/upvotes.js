const User = require("./users");
const Post = require("./posts");
module.exports = (sequelize, DataTypes) => {
  var Upvotes = sequelize.define('Upvotes', {});
  return Upvotes;
};
