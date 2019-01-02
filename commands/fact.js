const rp = require("request-promise");
const cheerio = require("cheerio");

exports.run = (client, message, args) => {
    const options = {
        uri: "http://randomfactgenerator.net",
        transform: (body) => {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(($) => {
            var fact = $("#z").text();
            fact = fact.split("Tweet");
            message.channel.send("```" + fact[0] + "```");
        })
        .catch((err) => {
            console.log(err);
        })
}    
