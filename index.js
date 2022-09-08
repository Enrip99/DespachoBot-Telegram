const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const config = require('./data/config.json');

const bot = new TelegramBot(config.token, {polling: true});

bot.onText(/^(alguien despacho(\?*)|\/alguiendespacho)$/i, (msg, match) => {
		takePicAndSend(msg.chat.id)
		console.log(msg)
})

bot.on('sticker', (msg) => {
	if (msg.sticker.file_unique_id == 'AgADCwEAAvOhJgo'){
		takePicAndSend(msg.chat.id)
	}
})

function takePicAndSend(chatId){
	if (chatId == config.ChatId){
		bot.sendPhoto(chatId, 'data/Foto.png')
	}
}