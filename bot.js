const TelegramBot = require('node-telegram-bot-api');

const token = 'TELEGRAM BOT API TOKEN'; 
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Hello World');
    }
    if (messageText === '/payment') {
    const title = 'title'
    const description = 'ololo'
    const payload = 128
    const provider_token = 'PAYMENT PROVIDER'
    const currency = 'USD'
    const price = [{label : 'tax',amount: 999}]
    bot.sendInvoice(chatId,title,description,payload,provider_token,currency,price)
    }
})
bot.on('pre_checkout_query', (msg) => {
    bot.answerPreCheckoutQuery(msg.id, true)
        .then((response) => {
            console.log('Pre-Checkout Query Answered Successfully:', response);
        })
        .catch((error) => {
            console.error('Error answering pre-checkout query:', error);
        });
});
bot.on('successful_payment', (msg) => {
    const chatId = msg.chat.id;
    const currency = msg.successful_payment.currency;
    const totalAmount = msg.successful_payment.total_amount/100;
    bot.sendMessage(chatId, `Payment successful! Currency: ${currency}, Amount:$${totalAmount}`)
});