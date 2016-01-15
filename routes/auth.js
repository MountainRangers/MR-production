var express = require('express');
var router = express.Router();
var passport = require('passport');
var api = require('./api');

router.get('/google',
  passport.authenticate('google', {
    scope: 'email https://www.googleapis.com/auth/plus.login'
  })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    api.users.getUser_GoogleID(req.user.google_id).then(function(user) {
      if (user) {
        res.redirect('/timeline');
      } else {
        res.redirect('/makeprofile');
      }
    }).catch(function(error) {
      console.log(error);
    });
  }
);

/* KEEP THIS!! This is a route that does logout if we want it later */
// router.get('/logout', function(req, res, next) {
//   req.session.destroy(function(err) {
//     console.log(err);
//   });
//   res.redirect('/');
// });

module.exports = router;
