const express = require('express');
const router = express.Router();
const passport = require('passport');

const Task = require('../models/Task');

router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
  Task.find()
    .then(tasks => {
      return res.json(tasks);
    })
    .catch(err => {
      return res.status(500).json({error: 'shit !'});
    })
});

router.get('/type/:type', passport.authenticate('jwt', {session: false}), (req, res) => {
  Task.find({type: req.params.type})
    .then(tasks => {
      return res.json(tasks);
    })
    .catch(err => {
      return res.status(500).json({error: 'shit !'});
    })
});

router.get('/id/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).json({error: "task not found"});
      }

      return res.json(task);
    })
    .catch(err => {
      return res.status(500).json({error: 'shit !'});
    })
});

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  let newTask = new Task({
    title: req.body.title,
    note: req.body.note,
    type: req.body.type,
    user: {
      _id: req.user._id,
      username: req.user.username,
      name: req.user.name
    }
  });

  newTask.save()
    .then(task => {
      return res.json({
        success: true,
        data: task
      });
    })
    .catch(err => {
      return res.status(500).json({error: 'shit !'});
    })
});

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).json({error: "task not found"});
      }

      task.delete()
        .then(data => {
          res.json({
            success: true
          });
        })
        .catch(err => {
          return res.status(500).json({error: 'shit !'});
        })
    })
    .catch(err => {
      return res.status(500).json({error: 'shit !'});
    })
});

router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).json({error: "task not found"});
      }

      task.title = req.body.title ? req.body.title : task.title;
      task.note = req.body.note ? req.body.note : task.note;
      task.type = req.body.type ? req.body.type : task.type;
      task.user = {
        _id: req.user._id,
        username: req.user.username,
        name: req.user.name
      };

      task.save()
        .then(task => {
          res.json({
            success: true,
            data: task
          });
        })
        .catch(err => {
          return res.status(500).json({error: 'shit !'});
        })
    })
    .catch(err => {
      return res.status(500).json({error: 'shit !'});
    })
});


module.exports = router;
