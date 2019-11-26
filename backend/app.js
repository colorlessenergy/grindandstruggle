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

const cors = require('cors');

app.use(cors(
  {
    origin: config.FRONTEND_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
))


// middleware 
const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())

// routes
const usersRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const replyRouter = require('./routes/replyRouter');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/replies', replyRouter);

// error handler

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send(err);
});

app.listen(process.env.PORT || 3001, () => {
  console.log('port 3001');
});