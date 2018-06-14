const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const keys = require('./config/keys');
const users = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ----------- db --------------
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error));

// ----------- passport --------------
app.use(passport.initialize());
require('./services/passport')(passport);

// ----------- routes --------------
app.use('/api/user', users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on ' + PORT);
});
