const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config({path: path.resolve(__dirname, '.env')});

const authAPI = require('./routes/auth');
const taskAPI = require('./routes/task');

const app = express();

/** Connect to MongoDB */
mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err) throw err;

  console.log("connected to MongoDB");
});

/** Middleswares */
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Passport */
app.use(passport.initialize());
require('./utils/passport')(passport);

/** Routes */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/task'));

/** Serve App in production mode*/
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}

app.listen(process.env.PORT, (err) => {
  console.log(`APP STARTED ON PORT ${process.env.PORT}`);
})



