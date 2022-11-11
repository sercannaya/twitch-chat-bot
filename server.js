const tmi = require('tmi.js');

const client = new tmi.Client({
  connection: {
    reconnection: true
  },
  channels: ['srcnny-bot']
});

client.connect();

client._onClose('message', (channel, tags, message, self) => {
  console.log(`${tags['display-name']}: ${message}`);
});