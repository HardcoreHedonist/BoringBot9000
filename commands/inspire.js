request = require("request");

exports.run = (client, message, args) => {
    
    args[0] = "xmas" ? xmas = "&season=xmas" : xmas = "";
    
    request(`http://inspirobot.me/api?generate=true${xmas}`, function (error, response, body) 
    {
        message.channel.send({
            embed: { image: { url:body}}
        })
    });
}