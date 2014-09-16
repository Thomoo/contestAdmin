'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

/**
 * Validations
 */
var validatePresenceOf = function(value) {
  // If you are authenticating by any of the oauth strategies, don't validate.
  return (this.provider && this.provider !== 'local') || (value && value.length);
};

var validateUniqueUsername = function(value, callback) {
  var User = mongoose.model('User');
  User.find({
    $and: [{
      username: value
    }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, user) {
    callback(err || user.length === 0);
  });
};

/**
 * User Schema
 */

var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    validate: [validateUniqueUsername, 'Username is already in-use']
  },
  roles: {
    type: Array,
    enum:['admin', 'resultAdmin', 'competitorAdmin'],
    required: true
  },
  hashed_password: {
    type: String,
    validate: [validatePresenceOf, 'Password cannot be blank']
  },
  provider: {
    type: String,
    default: 'local'
  },
  salt: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.hashPassword(password);
}).get(function() {
  return this._password;
});

/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
  if (this.isNew && this.provider === 'local' && this.password && !this.password.length)
    return next(new Error('Invalid password'));
  next();
});

/**
 * Methods
 */
UserSchema.methods = {

  /**
   * IsAdmin - check if the user is an administrator
   *
   * @return {Boolean}
   * @api public
   */
  isAdmin: function() {
    return this.roles.indexOf('admin') !== -1;
  },

  /**
   * IsResultAdmin - check if the user is an administrator of results
   *
   * @return {Boolean}
   * @api public
   */
  isResultAdmin: function() {
    return this.roles.indexOf('admin') !== -1 || this.roles.indexOf('resultAdmin') !== -1;
  },

  /**
   * IsCompetitorAdmin - check if the user is an administrator of competitors
   *
   * @return {Boolean}
   * @api public
   */
  isCompetitorAdmin: function() {
    return this.roles.indexOf('admin') !== -1 || this.roles.indexOf('competitorAdmin') !== -1;
  },

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.hashPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Hash password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  hashPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

mongoose.model('User', UserSchema);
