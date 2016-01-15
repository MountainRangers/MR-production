var express = require('express');
var router = express.Router();
var api = require('./api');

router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('landing', {
    title: 'TrailMix'
  });
});

router.get('/addpost', ensureAuthenticatedandUser, function(req, res, next) {
  res.render('addpost', {
    title: 'TrailMix',
    id: req.user.id,
  });
});

router.post('/addpost', ensureAuthenticatedandUser, function(req, res, next) {
  req.body.userid = req.user.id;
  api.posts.createOne(req.body).then(function(data){
    res.sendStatus(201);
  });
});

router.get('/makeprofile', ensureAuthenticated, function(req, res, next) {
  if (req.user.id) {
    res.redirect('/timeline');
  } else {
    req.user.profilePhoto = req.user.profilePhoto.split('?').shift();
    res.render('makeprofile', {
      title: 'TrailMix',
      profile: req.user
    });
  }
});

router.post('/makeprofile', ensureAuthenticated, function(req, res, next) {
  api.users.createUser({
    email: req.user.email,
    username: req.body.userName,
    google_id: req.user.google_id,
    photo_url: req.user.profilePhoto,
    personal_info: 'Please add some personal info'
  }).then(function(id) {
    res.redirect('/timeline');
  });
});

router.get('/post/:postid', ensureAuthenticatedandUser, function(req, res, next) {
  api.posts.readOne(req.params.postid).then(function(postdata) {
    postdata.posts[0].date = formatDate(postdata.posts[0].created_at);
    res.render('post', {
      title: 'TrailMix',
      id: postdata.posts[0].user_id,
      post: postdata.posts[0],
      tag: postdata.tags[0],
      user: postdata.posts[0].user_id === req.user.id ? true : false
    });
  });
});

router.delete('/post/:postid', ensureAuthenticatedandUser, function(req, res, next){
  api.posts.deleteOne(req.params.postid).then(function(postdata){
    res.end();
  });
});

router.get('/profile/:userid', ensureAuthenticatedandUser, function(req, res, next) {
  api.users.getUsersPosts(req.params.userid).then(function(data) {
    res.render('profile', {
      title: 'TrailMix',
      id: req.user.id,
      noPosts: data.userposts <= 0 ? true : false,
      date: formatDate(data.user.memberSince),
      showSettings: data.user.user_id === req.user.id ? true : false,
      user: data.user,
      posts: data.userposts,
      tag: data.userposts.tag_name
    });
  }).catch(function(err) {
    console.log(err);
  });
});

router.get('/settings', ensureAuthenticatedandUser, function(req, res, next) {
  api.users.getUser(req.user.id).then(function(userdata) {
    var date = formatDate(userdata.created_at);
    res.render('settings', {
      title: 'TrailMix',
      profile: {
        id: userdata.id,
        username: userdata.username,
        date_created: date,
        personal_info: userdata.personal_info,
        photo_url: userdata.photo_url
      }
    });
  });
});

router.put('/settings', ensureAuthenticated, function(req, res, next) {
  api.users.updateUser(
    req.user.id,
    req.body.userinfo
  ).then(function(data){
      res.end();
  });
});

router.get('/timeline', ensureAuthenticatedandUser, function(req, res, next) {
  api.posts.readAll().then(function(posts) {
    res.render('timeline', {
      id: req.user.id,
      posts: posts
    });
  });
});

function formatDate(dateString) {
  var newDate = (dateString).toString().split(' ');
  var formattedDate = newDate[1] + ' ' + newDate[2] + ", " + newDate[3];
  return formattedDate;
}

function ensureAuthenticatedandUser(req, res, next) {
  if (req.isAuthenticated() && req.user.id) {
    return next();
  }
  res.redirect('/');
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
