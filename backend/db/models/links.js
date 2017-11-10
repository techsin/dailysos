const Post = require("./posts.js");

module.exports = (sequelize, DataTypes) => {
  var Links = sequelize.define('Links', {
    global_upvotes: {type: DataTypes.INTEGER, defaultValue: 1},
    url: DataTypes.TEXT
  })
  Links.hasMany(Post);
  return Links;
};
