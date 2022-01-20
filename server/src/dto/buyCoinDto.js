const { object, string, number } = require('yup');

const buyCoinDto = object().shape({
  symbol: string().required(),
  quantity: number().required(),
});

module.exports = buyCoinDto;
