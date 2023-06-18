const Movies = require('../models/movies');
const BadRequestError = require('../errors/badrequest');
const NotFoundError = require('../errors/notfound');
const ForbiddenError = require('../errors/forbidden');

const getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovies = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Movies.create({ name, link, owner: _id })
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
  const { moviesId } = req.params;

  Movies.findById(moviesId)
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Карточка с указанным ID не найдена.');
      } else if (movies.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Запрещено удалять не свои карточки');
      } else {
        return Movies.deleteOne({ _id: moviesId }).then(() => res.send(movies));
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
