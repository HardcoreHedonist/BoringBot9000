exports.run = (client, message, args) => {
    var random = Math.floor(Math.random() * 2090)
    request(`http://xkcd.com/${random}/info.0.json`, function (error, response, body) 
    {
        if (error){
            message.channel.send("xkcd unavailable sorry :( Why don't you try another command?")
        }
        else
            var obj = JSON.parse(body);
            message.channel.send({embed: {image:{url:obj.img}}});
    })
}