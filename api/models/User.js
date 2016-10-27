/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

/**
 * @global Time 
 */

module.exports = {

  tableName: 'users',
  adapter: 'mysql-adapter',
  migrate: 'safe',
  connection: 'someMysqlServer',
  schema: true,
  
  attributes: {
    email: {
      type: 'email',
      required: 'true',
      unique: true // Yes unique one
    },

    name: {
      type: 'string'
    },

    password: {
      type: 'string'
    },

    createdAt: {
      columnName: 'created_at',
      type: 'datetime'
    },

    updatedAt: {
      columnName: 'updated_at',
      type: 'datetime'
    },

    created_at: {
      type: 'datetime'
    },

    updated_at: {
      type: 'datetime'
    },
    // We don't wan't to send back encrypted password either
    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },
  // Here we encrypt password before creating a User
  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.password = hash;
        var currentTime = Time.getCurrentTime('Y-m-d H:i:s');
        values.name = '';
        values.createdAt = currentTime;
        values.updatedAt = currentTime;
        next();
      });
    });
  },

  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  }
};

