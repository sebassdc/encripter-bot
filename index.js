const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '384616347:AAF0H5FKWauH_coH5faRYse5VttIGEYrgNI';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


// Encription logic
const playPass = function(s, n) {
  return s
    .replace(/[A-Z]/g, function(char) {
      return String.fromCharCode((char.charCodeAt(0) - 65 + n) % 26 + 65);
    })
    .replace(/[a-z]/g, function(char) {
      return String.fromCharCode((char.charCodeAt(0) - 97 + n) % 26 + 97);
    })
    // .replace(/\d/g, function(digit) {
    //   return 9 - digit;
    // })
    .replace(/(.)(.?)/g, function(match, odd, even) {
      return odd.toUpperCase() + even.toLowerCase();
    })
    .split('').reverse().join('');
};

// Matches "/encript [whatever]"
bot.onText(/\/encrypt (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  console.log("message: " + resp);

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, playPass(resp, 2));
});

bot.onText(/\/decrypt (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, playPass(resp, -2));
});

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//
//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });
