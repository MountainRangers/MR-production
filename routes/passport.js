var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var api = require('./api');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.HOST + '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, {
      email: profile.emails[0].value,
      google_id: profile.id,
      displayName: profile.displayName,
      profilePhoto: profile.photos[0].value
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  findUserByGoogleID(user.google_id).then(function(user_id) {
    done(null, {id: user_id});
  }).catch(function(err) {
    if (err === 'User not found in DB') {
      done(null, user);
    } else {
      console.log(err);
      done(error);
    }
  });
});

function findUserByGoogleID(id) {
  return api.users.getUser_GoogleID(id).then(function(user) {
    if (user) {
      return user.id;
    } else {
      return Promise.reject('User not found in DB');
    }
  });
}
