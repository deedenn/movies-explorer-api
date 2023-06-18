const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

const router = require('./routes');
const signRouter = require('./routes/sign');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/errorLogger');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('База данных подключена');
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер падает');
  }, 0);
});

app.use(signRouter);
app.use(auth);

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});