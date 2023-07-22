const { Joi } = require('celebrate');
const { regExp } = require('./constants');

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const registrationValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
};

const createMoviesValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regExp),
    trailerLink: Joi.string().required().regex(regExp),
    thumbnail: Joi.string().required().regex(regExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const deleteMoviesValidation = {
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
};

const updateProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  loginValidation,
  registrationValidation,
  createMoviesValidation,
  deleteMoviesValidation,
  updateProfileValidation,
};
