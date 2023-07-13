module.exports.options = {
  origin: [ // Массив доменов, с которых разрешены кросс-доменные запросы.
    'https://domainname.nataly.nomoredomains.sbs',
    'http://domainname.nataly.nomoredomains.sbs',
    'https://localhost:3001',
    'http://localhost:3001',
    'https://localhost:3000',
    'http://localhost:3000',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // настраивает заголовок CORS Access-Control-Allow-Methods.
  preflightContinue: false, // передать предварительный ответ CORS следующему обработчику.
  optionsSuccessStatus: 204, // Предоставляет код состояния для успешных OPTIONSзапросов.
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
  credentials: true, // сообщает браузерам, следует ли предоставлять ответ внешнему коду JS.
};
