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
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&units=metric&lang=ru&appid=${process.env.API_KEY}`
    : `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        ctx.message.text,
      )}&units=metric&lang=ru&appid=${process.env.API_KEY}`;

  axios
    .get(url)
    .then(function (response) {
      let message = getWeather(response.data);
      ctx.reply(message);
    })
    .catch(function (error) {
      ctx.reply('Ошибка получения ответа от сервера');
    });
});

bot.launch();

/**
 * Форматирование сообщения
 *
 * @param {*} data
 */
function getWeather(data) {
  let message = `Температура: ${Math.ceil(
    data.main.temp,
  )}°\n${data.weather[0].description[0].toUpperCase()}${data.weather[0].description.slice(
    1,
  )}\nМин. темп.: ${Math.ceil(data.main.temp_min)}°\nМакс. темп.: ${Math.ceil(
    data.main.temp_max,
  )}°`;
  return message;
}
