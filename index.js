require('dotenv').config();
const axios = require('axios');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const options = {
  method: 'GET',
  url: 'https://weather167.p.rapidapi.com/clima',
  headers: {
    'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
  },
  data: {
    latitud: '',
  },
};

bot.start((ctx) => {
  ctx.reply(
    'Добро пожаловать. Этот бот для уведомления о погоде на сегодня. Бот находиться в разработке, так что учитывайте это 😉',
  );
  ctx.reply('Для начала пришлите геопозицию');
});

bot.help((ctx) => {
  ctx.reply('Напишите название города и я покажу вам погоду');
});

bot.on('message', (ctx) => {
  if (ctx.message?.location?.latitude) {
    // axios
    //   .request({
    //     method: 'GET',
    //     url: 'https://weather167.p.rapidapi.com/clima',
    //     headers: {
    //       'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
    //       'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
    //     },
    //     data: {
    //       latitud: ctx.message.location.latitude,
    //     },
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  } else {
    ctx.reply('Пришлите свою геопозицию');
  }
});

bot.launch();
