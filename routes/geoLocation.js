var express = require('express');
var router = express.Router();
var api = require('./api');

require('dotenv').load();

/*
Galvanize coords
  lat: 39.757649699999995
  long: -105.0072726
*/

router.get('/:postid', ensureAuthenticatedandUser, function(req, res, next) {
  api.posts.readOne(req.params.postid).then(function(postdata) {
    res.render('location', {
      title: 'TrailMix',
      id: req.user.id,
      key: process.env.GOOGLE_MAPS,
      latitude: postdata.posts[0].latitude,
      longitude: postdata.posts[0].longitude
    });
  }).catch(function(error) {
    console.log(error);
  });
});

function ensureAuthenticatedandUser(req, res, next) {
  if (req.isAuthenticated() && req.user.id) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
