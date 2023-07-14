const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
// ошибки для проверки ошибок
const FoundError = require('../utils/errors/FoundError');
const ConflictError = require('../utils/errors/ConflictError');
const DataError = require('../utils/errors/DataError');
const ServerError = require('../utils/errors/ServerError');

const { NODE_ENV, JWT_SECRET } = process.env;
// регистрация
module.exports.createUser = (req, res, next) => {
  // console.log('hi');
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    // .hash(String(password), 10)
    .hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPassword,
      })
        .then(() => {
          // console.log('новый пользователь');
          // console.log({
          //   data: {
          //     name,
          //     about,
          //     avatar,
          //     email,
          //   },
          // });
          res.send({
            data: {
              name,
              about,
              avatar,
              email,
            },
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Такого пользователя не существует'));
          } else if (err.name === 'ValidationError') {
            next(new DataError('Переданы некоректные данные'));
          } else {
            next(new ServerError());
          }
        });
    })
    .catch(next);
};
// аутентификация
module.exports.login = (req, res, next) => {
  // console.log('hi');
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user || !password) {
        return next(new DataError('Неверный email или пароль.'));
      }
      const token = jsonWebToken.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      // res.cookie('token', token, {
      //   maxAge: 3600000 * 24 * 7,
      //   httpOnly: true,
      //   secure: false,
      //   sameSite: 'Lax',
      // });
      // console.log('вход');
      return res.send({ token });
      // .send({
      //   name: user.name,
      //   about: user.about,
      //   avatar: user.avatar,
      //   email: user.email,
      //   _id: user._id,
      // });
    })
    .catch(next);
};
// получение пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => next(new ServerError()));
};
// получение пользователей по id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.send(user);
    })
    // обработка ошибок
    .catch((err) => {
      if (err.message === 'Not Found') {
        next(new FoundError('Пользователь не найден'));
      } else if (err.name === 'CastError') {
        next(new DataError('Некоректный идентификатор'));
        // return;
      } else {
        next(new ServerError());
      }
    });
};
// получить текущего пользователя
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некоректные данные'));
      } else if (err.message === 'Not Found') {
        next(new FoundError('Пользователь не найден'));
      } else {
        next(new ServerError());
      }
    });
};
// обновление аватара
module.exports.UpdateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  // console.log(avatar);
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new FoundError('Некоректный идентификатор'));
      } else if (err.name === 'ValidationError') {
        next(new DataError('Переданы некоректные данные'));
      } else if (err.message === 'Not Found') {
        next(new DataError('Пользователь не найден'));
      } else {
        next(new ServerError());
      }
    });
};
// обновление профиля
module.exports.UpdateProfile = (req, res, next) => {
  // console.log('hi');
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new FoundError('Некоректный идентификатор'));
      } else if (err.name === 'ValidationError') {
        next(new DataError('Переданы некоректные данные'));
      } else if (err.message === 'Not Found') {
        next(new DataError('Пользователь не найден'));
      } else {
        next(new ServerError());
      }
    });
};
