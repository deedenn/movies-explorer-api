const express = require('express');

const { celebrate } = require('celebrate');
const {
  createMoviesValidation, deleteMoviesValidation,
} = require('../utils/validation');

const moviesRouter = express.Router();
const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', celebrate(createMoviesValidation), createMovies);
moviesRouter.delete('/movies/_id', celebrate(deleteMoviesValidation), deleteMovies);

module.exports = moviesRouter;
