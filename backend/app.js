const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorHandler = require('./middlwares/error');
const { requestLogger, errorLogger } = require('./middlwares/logger');
const corsError = require('./middlwares/cors');
// константы
const app = express();
app.use('*', cors(corsError));
app.use(express.json());
// app.use(cors());
const { PORT = 3000 } = process.env;
// // подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
// роуты
app.use(cookieParser());
// логигер запросов
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
// логгер ошибок
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
// порт
app.listen(PORT);
// app.listen(PORT, () => {
//   console.log(`Порт: ${PORT}`);
// });
