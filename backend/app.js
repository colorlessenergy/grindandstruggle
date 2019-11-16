const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const config = require('./models/config/config');

mongoose
.connect(config.DB_URL, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('connected'))
  .catch(err => console.log(err));


// middleware 

const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())

// routes
const usersRouter = require('./routes/userRoutes');
app.use('/users', usersRouter);


// error handler

app.use((err, req, res, next) => {
  return res.status(500).send(err);
});

app.listen(process.env.PORT || 3001, () => {
  console.log('port 3001');
});