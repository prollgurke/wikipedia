/**
 * Created by Will on 12/6/2016.
 */

require('dotenv').config({
    silent: true
});
const Discord = require('discord.js');
const messageHandler = require('./handlers/message');

const client = new Discord.Client({
    messageCacheLifetime: 1800,
    messageSweepInterval: 900/*,
    disabledEvents: [
        'CHANNEL_CREATE',
        'CHANNEL_UPDATE',
        'CHANNEL_DELETE',
        'CHANNEL_PINS_UPDATE',
        'DEBUG',
        'DISCONNECT',
        'ERROR',
        'GUILD_CREATE',
        'GUILD_UPDATE',
        'GUILD_DELETE',
        'GUILD_BAN_ADD',
        'GUILD_BAN_REMOVE',
        'GUILD_EMOJI_CREATE',
        'GUILD_EMOJI_DELETE',
        'GUILD_EMOJI_UPDATE',
        'GUILD_MEMBER_ADD',
        'GUILD_MEMBER_AVAILABLE',
        'GUILD_MEMBER_REMOVE',
        'GUILD_MEMBER_UPDATE',
        'GUILD_MEMBER_SPEAKING',
        'GUILD_MEMBERS_CHUNK',
        'ROLE_CREATE',
        'ROLE_UPDATE',
        'ROLE_DELETE',
        'GUILD_UNAVAILABLE',
        'MESSAGE_UPDATE',
        'MESSAGE_DELETE',
        'MESSAGE_DELETE_BULK',
        'PRESENCE_UPDATE',
        'TYPING_START',
        'TYPING_STOP',
        'USER_SETTINGS_UPDATE',
        'RECONNECTING',
        'USER_UPDATE',
        'VOICE_STATE_UPDATE',
        'WARN'
    ]*/
});
client.on('message', messageHandler);
client.on('ready', () => console.log('ready'));
client.login(process.env.DISCORD_TOKEN);