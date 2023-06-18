const express = require('express');

const { celebrate } = require('celebrate');
const { getInfoUser } = require('../controllers/users');
const { updateUser } = require('../controllers/users');
const { updateProfileValidation } = require('../utils/validation');

const usersRouter = express.Router();

usersRouter.get('/me', getInfoUser);
usersRouter.patch('/me', celebrate(updateProfileValidation), updateUser);

module.exports = usersRouter;