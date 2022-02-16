const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model.js')
const Posts = require('../posts/posts-model')

// The middleware functions also need to be required
const { logger , validateUserId , validateUser , validatePost } = require('../middleware/middleware')  


const router = express.Router();

router.get('/', logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the users',
      });
    });
});

router.get('/:id',validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  res.status(200).json(req.user)
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  Users.insert(req.body)
    .then(user =>{
      res.status(201).json(user)
    })
    .catch(err =>{
      console.log(err);
      res.sendStatus(500).json({
        message: ` Error adding the user`
      });
    });
  // this needs a middleware to check that the request body is valid
});

router.put('/:id',validateUserId,validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  Users.update(req.params.id, req.body)
  .then(user =>{
    res.status(200).json(user);
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: 'Error updating the hub',
    });
  });
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id',validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  Users.remove(req.params.id)
  .then(user =>{
    res.status(200).json(user)
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
      message: 'Error removing the user',
    })
  })
  // this needs a middleware to verify user id
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  Users.getUserPosts(req.params.id)
  .then(posts =>{
    res.status(200).json(posts)
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({message: 'Error getting the posts for the user'})
  })
  // this needs a middleware to verify user id
});

router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  const postInfo = { ...req.body, user_id: req.params.id};
  Posts.insert(postInfo)
  .then(post =>{
    res.status(210).json(post)
  })
  .catch(err =>{
    console.log(err);
  })
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router;