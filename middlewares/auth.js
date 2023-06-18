const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unautorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (e) {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
