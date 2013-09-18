//set NODE_ENV
process.env.NODE_ENV = 'test';

//dependencies
var config = require('../config/config');
var mongoose = require('mongoose');
var _ = require('underscore');

beforeEach(function(done) {
  var clearDB = function() {
    _.each(mongoose.connection.collections, function(item) {
      item.remove(function(err) {
        if (err) {
          throw new Error('</3', err);
        }
      });
    });
  
    return done();
  };

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.db, function(err) {
      if (err) {
        throw err;
      }

      return clearDB();
    });
  } else {
    return clearDB();
  }
});

afterEach(function(done) {
  mongoose.disconnect(function(error) {
    if (error) {
      throw new Error('</3', error);
    }
    
    done();
  });
});