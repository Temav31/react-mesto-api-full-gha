const jwt = require('jsonwebtoken');
const SignInError = require('../utils/errors/SignInError');
// мидлвара
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new SignInError('Неправильная авторизация');
  }
  // извлекаем токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new SignInError('Неправильная авторизация'));
  }
  req.user = payload;
  return next();
};
