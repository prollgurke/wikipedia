/**
 * Created by Will on 12/6/2016.
 */

require('dotenv').config();
const Discord = require('discord.js');
const messageHandler = require('./handlers/message');

const client = new Discord.Client();
client.on('message', messageHandler);
client.on('ready', () => console.log('ready'));
client.login(process.env.DISCORD_TOKEN);