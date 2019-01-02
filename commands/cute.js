
exports.run = (client, message, args) => {
    args[0] = "dog" ? pet = "dog" : "cat" ? pet = "cat" : pet = "dog", message.channel.send("We don't have that so here's a dog instead");
    request(`https://api.the${pet}api.com/v1/images/search?X-API-KEY=dab6cc1c-45be-4d81-b77f-bf82f02b3fb4`, function (error, response, body) 
    {
        if (error){
            message.channel.send(`Sorry! ${pet} picture unavailable. :( Why don't you try another command?`)
        }
        else
            var obj = JSON.parse(body);
            message.channel.send({embed: {image:{url:obj[0].url}}});
    })
}