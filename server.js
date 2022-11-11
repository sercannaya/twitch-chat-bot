/*
    Do not forget to create the ".env" file and write your data in it as below.
              TWITCH_BOT_USERNAME="[Chat bot Twitch username]"
              TWITCH_OAUTH_TOKEN="[Chat bot Twitch oAuth token]"      
*/
require('dotenv').config();

const tmi = require('tmi.js');

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const commands = {
  website: {
    // Desired website address can be written
    response: 'https://www.sercannaya.com'
  },
  upvote: {
    response: (argument) => `Successfully upvoted ${argument}`
  }
}

const client = new tmi.Client({
  connection: {
    reconnect: true
  },
  channels: [
    // The name of the account to be used as a bot will be written
    'srcnny-bot'
  ],
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  }
});

client.connect();

client.on('message', async (channel, context, message) => {
  const isNotBot = context.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase();

  if ( !isNotBot ) {
    return;
  }

  const [raw, command, argument] = message.match(regexpCommand);

  const { response } = commands[command] || {};

  let responseMessage = response;

  if ( typeof responseMessage === 'function' ) {
    responseMessage = response(argument);
  }

  if ( responseMessage ) {
    console.log(`Responding to command !${command}`);
    client.say(channel, responseMessage);
  }

});