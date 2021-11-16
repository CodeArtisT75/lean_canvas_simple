const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const SecretKey = process.env.PASSPORT_SECRET_KEY;

const User = require('../models/User');

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username, password: req.body.password})
    .then(user => {
      if (!user) {
        return res.status(404).json({error: "user not found"});
      }

      let payLoad = {
        id: user.id,
        name: user.name,
        username: user.username,
      };

      jwt.sign(payLoad, SecretKey, {expiresIn: 3600000000}, (err, token) => {
        return res.json({
          success: true,
          token: 'Bearer ' + token,
          user: payLoad
        });
      });
    })
    .catch(err => {
      return res.status(500).json({error: 'SHIT !'});
    })

});

router.get('/user', passport.authenticate('jwt', {session: false}), (req, res) => {
  return res.json({
    id: req.user._id,
    username: req.user.username,
    name: req.user.name,
  });
});

router.post('/register', (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name
  });

  newUser.save()
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      return res.status(500).json({error: 'shit !'});
    })
})


module.exports = router;
