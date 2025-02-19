import bot from '../../config/bot';

bot.on('callback_query', async (query) => {
  console.log('callback_query', query);
});