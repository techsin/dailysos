module.exports = (db) => {
  const Posts = db.Posts;
  const Links = db.Links;
  const Upvotes = db.Upvotes;
  const Users = db.Users;

  Links.hasMany(Posts);
  Posts.belongsTo(Links);
  Posts.belongsTo(Users);
  Posts.hasMany(Upvotes);
  Upvotes.belongsTo(Users);
  Upvotes.belongsTo(Posts);
  Users.hasMany(Upvotes);
  Users.hasMany(Posts);
};