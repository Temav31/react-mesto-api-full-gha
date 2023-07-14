require('dotenv').config();
const fs = require('fs');
const https = require('https');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/work.tema.nomoredomains.work/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/work.tema.nomoredomains.work/fullchain.pem', 'utf8');
const router = require('./routes/index');
const errorHandler = require('./middlwares/error');
const { requestLogger, errorLogger } = require('./middlwares/logger');
const corsError = require('./middlwares/cors');
// константы
const app = express();
app.use('*', cors(corsError));
// app.use(cors());
app.use(helmet());
app.use(express.json());
const { PORT = 3000 } = process.env;
// // подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
// роуты
app.use(cookieParser());
// логигер запросов
app.use(requestLogger);
// app.use(corsError);
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
// app.listen(PORT, () => {
//   console.log(`Порт: ${PORT}`);
// });
const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);

httpsServer.listen(PORT);
