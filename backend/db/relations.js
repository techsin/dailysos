const db = require('./models');
const Posts = require(db.Posts);
const Links = require(db.Links);
const Upvotes = require(db.Upvotes);

  Links.hasMany(Post);
  Posts.belongsTo(Link);
  Posts.belongsTo(User);
  Posts.hasMany(Upvote);
  Upvotes.belongsTo(User);
  Upvotes.belongsTo(Post);
