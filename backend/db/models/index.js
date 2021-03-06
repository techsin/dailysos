'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};
var highlight = require('cli-highlight').highlight;

var highlight_config = {
  logging(log) {
    console.log(highlight(log, {language: 'sql', ignoreIllegals: true}))
  }
};
config.logging = highlight_config.logging;

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], highlight_config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
// sequelize.sync({ alter: true });
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
require('../relations')(db);

module.exports = db;
