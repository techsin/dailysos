const Post = require("./posts");

module.exports = (sequelize, DataTypes) => {
  var Links = sequelize.define('Links', {
    global_upvotes: {type: DataTypes.INTEGER, defaultValue: 1},
    url: {type: DataTypes.TEXT, unique: true},
    title: {type: DataTypes.STRING, defaultValue: "Link got no title"}
  })
  return Links;
};
