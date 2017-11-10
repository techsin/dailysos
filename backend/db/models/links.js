const Post = require("./posts");

module.exports = (sequelize, DataTypes) => {
  var Links = sequelize.define('Links', {
    global_upvotes: {type: DataTypes.INTEGER, defaultValue: 1},
    url: DataTypes.TEXT
  })
  return Links;
};
