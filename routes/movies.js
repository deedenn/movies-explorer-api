const express = require('express');

const { celebrate } = require('celebrate');
const {
  createMoviesValidation, deleteMoviesValidation,
} = require('../utils/validation');

const moviesRouter = express.Router();
const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrate(createMoviesValidation), createMovies);
moviesRouter.delete('/:_id', celebrate(deleteMoviesValidation), deleteMovies);

module.exports = moviesRouter;
