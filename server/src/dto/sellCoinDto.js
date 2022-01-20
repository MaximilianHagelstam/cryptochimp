const { object, string } = require('yup');

const sellCoinDto = object().shape({
  symbol: string().required(),
});

module.exports = sellCoinDto;
