var upload = require('../lib/upload');
var retrieve = require('../lib/retrieve'); 
var resize = require('../lib/resize');
var helpers = require('../lib/helperfunctions');
var url = require('url');
var qs = require('qs');
var fs = require('fs');
var uuid = require('node-uuid');
var db = require('../app/models/imageMetaData');

module.exports = {
  routeHandler: function(app) {
    var key = uuid.v4().split('-').pop();
    
    //middleware for retrieving images
    app.param('image', function(req, res, next, key) {
      db.find({key: key}, function(error, data) {
          if (error) {
            return next(error);
          }

          if (data.length === 0) {
            console.error('image has not been uploaded </3');
            helpers.write(req, res, 404);
          }

          req.key = key;
          next();
        });
    });

    //home route
    var home = require('../app/controllers/home');
    app.get('/', home.index);

    //upload route
    app.post('/upload', upload.upload, function(req, res) {
      helpers.write(req, res, 201);
    });

    //get image route
    app.get('/:image', retrieve.retrieve, function(req, res) {
      helpers.write(req, res, 200);
    });

    //resize image route
    app.get('/:image/size', resize.retrieve, function(req, res) {
      helpers.write(req, res, 200);
    });
  },
};