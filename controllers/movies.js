const Movie = require('../models/movies');
const BadRequestError = require('../errors/badrequest');
const NotFoundError = require('../errors/notfound');
const ForbiddenError = require('../errors/forbidden');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovies = (req, res, next) => {
  const { _id } = req.user;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((newMovies) => {
      res.status(201).send(newMovies);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(err);
    });
};

const deleteMovies = (req, res, next) => {
  Movie.findById({ _id: req.params._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Карточка с указанным ID не найдена.');
      } else if (movies.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Запрещено удалять не свои карточки');
      } else {
        return Movie.deleteOne({ _id: req.params._id }).then(() => res.send(movies));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен некорректный ID'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies, createMovies, deleteMovies,
};
