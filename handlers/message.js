/**
 * Created by Will on 12/6/2016.
 */

let request = require('request-promise-native');
request = request.defaults({
    uri: 'https://en.wikipedia.org/w/api.php',
    method: 'get',
    qs: {
        format: 'json'
    },
    headers: {
        'User-Agent': 'DiscordWikipedia/1.0 (nelson.will@live.com) Discord.js/10.0.1'
    },
    json: true
});

function message(message)   {
    if(!message.content.startsWith(`<@${process.env.DISCORD_CLIENT_ID}`) && !message.content.startsWith(`<@!${process.env.DISCORD_CLIENT_ID}`)) return;
    request({
        qs: {
            search: message.content.split(' ').slice(1).join(' '),
            action: 'opensearch',
            limit: 1,
            profile: 'normal',
            redirects: 'resolve',
            namespace: '*'
        }
    }).then(res => {
        return Promise.all([
            request({
                qs: {
                    action: 'query',
                    prop: 'extracts',
                    exintro: true,
                    explaintext: true,
                    redirects: true,
                    exsentences: 4,
                    titles: res[1][0]
                }
            }),
            res
        ])
    }).then(([res, old]) => {
        const first = res.query.pages[Object.keys(res.query.pages)[0]];
        let out = `**__${first.title}__**\n${first.extract}\n*<${old[3][0]}>*`;
        message.channel.sendMessage(out);
    }).catch(console.error);
}

module.exports = message;