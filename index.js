require('dotenv').config();
const axios = require('axios');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    'Добро пожаловать. Этот бот для уведомления о погоде на сегодня. Бот находиться в разработке, так что учитывайте это 😉',
  );
  ctx.reply(
    'Для начала пришлите геопозицию или напишите название населенного пункта',
  );
});

bot.help((ctx) => {
  ctx.reply('Пришлите геопозицию или напишите название населенного пункта');
});

bot.on('message', (ctx) => {
  let url = ctx.message.location
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=${process.env.API_KEY}`
    : `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        ctx.message.text,
      )}&appid=${process.env.API_KEY}`;

  console.log(url);
  axios
    .get(url)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
      ctx.reply('Ошибка получения ответа от сервера');
    });
});

bot.launch();
