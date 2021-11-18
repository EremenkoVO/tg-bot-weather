require('dotenv').config();
const axios = require('axios');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

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
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=${process.env.API_KEY}`,
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
        ctx.reply('Ошибка получения ответа от сервера');
      });
  } else {
    ctx.reply('Пришлите свою геопозицию');
  }
});

bot.launch();
