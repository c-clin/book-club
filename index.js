const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const keys = require('./config/keys');
const users = require('./routes/authRoutes');
const books = require('./routes/bookRoutes');
const trade = require('./routes/tradeRoutes');

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
app.use('/api/books', books);
app.use('/api/trade', trade);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on ' + PORT);
});
