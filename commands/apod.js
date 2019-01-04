exports.run = (client, message, args) => {
    request('https://api.nasa.gov/planetary/apod?api_key=dP3Bs8hYmOsdhzYnwPIYweisi5OanwSMw5pQo6Sm', function (error, response, body) 
    {
        if (error){
            message.channel.send("NASA picture of the day unavailable sorry :( Why don't you try another command?")
        }
        else
            var obj = JSON.parse(body);
            message.channel.send({embed: {image:{url:obj.url}}});
            message.channel.send("```" + obj.explanation + "```");
    })
}