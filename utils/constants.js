const regExp = /http(s)?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+/;

const allowedCors = [
  'http://api.mymovie.nomoredomains.rocks',
  'https://api.mymovie.nomoredomains.rocks',
  'http://mymovie.nomoredomains.rocks',
  'https://mymovie.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'localhost:3001',
];

module.exports = {
  regExp,
  allowedCors,
};
