/* /models/user.js */

// Require all the stuff
var Sequelize = require('sequelize');
var passportLocalSequelize = require('passport-local-sequelize');
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];

// Setup sequelize db connection
var sequelize = new Sequelize(config.database, config.username, config.password, config);

// A helper to define the User model with username, password fields
var User = passportLocalSequelize.defineUser(sequelize, {
    favoriteColor: Sequelize.STRING
});

module.exports = User;