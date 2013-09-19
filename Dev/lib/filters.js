//dependencies
var helpers = require('./helperfunctions');
var upload = require('./upload');
var fs = require('fs');
var gm = require('gm');
var uuid = require('node-uuid');
var knox = require('knox');
var imageDataController = require('../app/controllers/ImageData.js');

module.exports = {
  //route filter based on filter param
  routeFilter: function(req, res) {
    filters[req.filter](req, res);  
  }
};

var filters = {
  blur : function(req, res) {
    console.log('been blurred');
    //default values for radius and sigma of blur filter
    var rad = req.query.r || 2;
    var sig = req.query.s || 2;

    //create new s3 key
    var key = uuid.v4().split('-').pop();

    //read file at requested path
    gm(process.env.LOCAL_FILE_PATH + '/' + req.key + '.jpg')
    .blur(rad, sig)
    .write(process.env.LOCAL_FILE_PATH + '/' + key + '.jpg', function(err) {
      if (err) {
        throw err;
      }

      helpers.helper.upload(req, res, process.env.LOCAL_FILE_PATH + '/' + key + '.jpg', 'transform', key );
    });  
  },

  charcoal: function(req, res) {
    console.log('been charcoaled, son');

    //default value for charcoal factor
    var factor = req.query.f || 3;

    //create new s3 key
    var key = uuid.v4().split('-').pop();

    gm(process.env.LOCAL_FILE_PATH + '/' + req.key + '.jpg')
    .charcoal(factor)
    .write(process.env.LOCAL_FILE_PATH + '/' + key + '.jpg', function(err) {
      if (err) {
        throw err;
      }

      helpers.helper.upload(req, res, process.env.LOCAL_FILE_PATH + '/' + key + '.jpg', 'transform', key );
    }); 
  },

  channel: function(req, res) {
    console.log('been channeled');

    //default value for color type
    var type = req.query.t || 'red';

    //create new s3 key
    var key = uuid.v4().split('-').pop();

    gm(process.env.LOCAL_FILE_PATH + '/' + req.key + '.jpg')
    .channel(type)
    .write(process.env.LOCAL_FILE_PATH + '/' + key + '.jpg', function(err) {
      if (err) {
        throw err;
      }

      helpers.helper.upload(req, res, process.env.LOCAL_FILE_PATH + '/' + key + '.jpg', 'transform', key );
    }); 
  }
};
