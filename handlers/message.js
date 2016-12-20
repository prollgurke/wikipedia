/**
 * Created by Will on 12/6/2016.
 */

let request = require('request-promise-native');
request = request.defaults({
    uri: 'https://de.wikipedia.org/w/api.php',
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
    if(!message.content.startsWith(`<@${process.env.DISCORD_CLIENT_ID}`) && !message.content.startsWith(`<@!${process.env.DISCORD_CLIENT_ID}`) && !message.content.startsWith('wiki ') && !message.content.startsWith('wiki, ')) return;
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
        if(!res[1] || !res[1][0]) return Promise.reject('no title: ' + res.toString());

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
        if(!res.query || !res.query.pages) return Promise.reject('no data: ' + res.toString());

        const first = res.query.pages[Object.keys(res.query.pages)[0]];
        let out = `**__${first.title}__**\n${first.extract}\n*<${old[3][0]}>*`;
        message.channel.sendMessage(out);
    }).catch(console.error);
}

module.exports = message;
