exports.run = (client, message, args) => {
    request(`http://api.urbandictionary.com/v0/define?term=${args.join("%20")}`, function(error, response, body){
        
        obj = JSON.parse(body);
        if (error || obj.list[0] === undefined) {
            message.channel.send("Sorry, definition not found.");
            return;
        }
        else {    
            message.channel.send(obj.list[0].permalink);
        }
    })
}