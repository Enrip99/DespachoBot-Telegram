const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const config = require('./data/config.json');
const NodeWebcam = require("node-webcam");

const opts = {
	width: 640,
	height: 480,
	quality: 50,
	frames: 1,
	delay: 0,
	saveShots: true,
	output: "png",
	device: false,
	callbackReturn: "location",
	verbose: false
};
const Webcam = NodeWebcam.create( opts );

const bot = new TelegramBot(config.token, {polling: true});

bot.onText(/^(alguien despacho(\?*)|\/alguiendespacho(@(.+))?)$/i, (msg, match) => {
		takePicAndSend(msg.chat.id)
})

bot.on('sticker', (msg) => {
	if(config.StickerList.indexOf(msg.sticker.file_unique_id) > -1){
		takePicAndSend(msg.chat.id)
	}
})

function takePicAndSend(chatId){
	if (chatId == config.ChatId){
		Webcam.capture( "data/Foto", function( err, data ) {
			if (err){
				bot.sendMessage(chatId, 'Error');
			}
			else {
				bot.sendPhoto(chatId, 'data/Foto.png').catch(e => {console.error(e)});
			}
		} );
	}
}