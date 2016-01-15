require('dotenv').load();

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

module.exports = {
  posts: {
    readAll: function() {
      return knex('posts').select(
        'posts.id as post_id',
        'posts.created_at as post_created_at',
        'posts.title as post_title',
        'posts.latitude as lat',
        'posts.longitude as long',
        'posts.body as posts_body',
        'users.id as user_id',
        'users.photo_url as photo_url',
        'users.username as username',
        'tags.name as tag_name'
      ).innerJoin("users", "posts.user_id", "users.id")
      .innerJoin("posts_tags", "posts.id", "posts_tags.post_id")
      .innerJoin("tags", "tags.id", "posts_tags.tag_id")
      .orderBy('post_created_at', 'desc');
    },
    readOne: function(id) {
      return Promise.all([
        knex('tags').select(
          'tags.id as id',
          'tags.name as name'
         )
        .innerJoin('posts_tags', 'posts_tags.tag_id', 'tags.id').where(
          {'posts_tags.post_id': id}
        ),
        knex('posts').select(
          'posts.*',
          'users.username as username',
          'users.photo_url as photo_url'
        )
        .innerJoin('users', 'posts.user_id', 'users.id').where({
          'posts.id': id
        })
      ]).then(function(data) {
        return Promise.resolve({
          tags: data[0],
          posts: data[1]
        });
      }).catch(function(err) {
        console.log(err);
      });
    },
    createOne:function(post){
      return knex('posts').insert({
        title: post.title,
        body: post.body,
        user_id: post.userid,
        latitude: post.latitude,
        longitude: post.longitude
      }, 'id')
        .then(function(post_id){
          return knex('tags').select('id').where({name: post.tag})
            .then(function(tag_id){
              return {post_id: post_id[0], tag_id: tag_id[0].id}
            })
          })
        .then(function(data){
          return knex('posts_tags').insert({post_id: data.post_id, tag_id: data.tag_id})
            .then(function(results){
              data.rowCount = results.rowCount;
              return data;
            })
          })
        .catch(function(error){
          console.error(error)
        })
    },
    deleteOne: function(id){
      return knex('posts').where({'posts.id': id}).del();
    }
  },
  users: {
    getUsersPosts: function(id) {
      return Promise.all([
        knex('users').select(
          'posts.id as post_id',
          'users.id as user_id',
          'posts.created_at as post_created_at',
          'posts.title as post_title',
          'posts.latitude as latitude',
          'posts.longitude as longitude',
          'tags.name as tag_name'
        ).innerJoin("posts", "posts.user_id", "users.id")
          .innerJoin("posts_tags", "posts.id", "posts_tags.post_id")
          .innerJoin("tags", "tags.id", "posts_tags.tag_id")
          .where('user_id', id)
          .orderBy('post_created_at', 'desc'),
        knex('users').select(
          'users.id as user_id',
          'users.photo_url as photo_url',
          'users.username as username',
          'users.personal_info as description',
          'users.created_at as memberSince'
        ).where('id', id).first()
      ]).then(function(data) {
        return Promise.resolve({
          userposts: data[0],
          user: data[1]
        });
      }).catch(function(err) {
        console.log(err);
      });
    },
    getUser: function(id) {
      return knex('users').select().where({
        id: id
      }).first();
    },
    getUser_GoogleID: function(id) {
      return knex('users').select().where({
        google_id: id
      }).first();
    },
    readAll: function(response) {
      return knex('users').select();
    },
    createUser: function(user) {
      return knex('users').insert(user, 'id');
    },
    updateUser: function(user, userbio) {
      return knex('users').where('id', user).update('personal_info', userbio);
    }
  }
};
