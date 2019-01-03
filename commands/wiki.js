const rp = require("request-promise");

exports.run = (client, message, args) => {
    
    if (args[0] == "simple"){
        args = args.slice(1, args.length);
        var options = {
            uri: `https://simple.wikipedia.org/w/api.php?action=opensearch&search=${args.join(" ")}&format=json`    
        };
    }
    else{
        var options = {
            uri : `https://en.wikipedia.org/w/api.php?action=opensearch&search=${args.join(" ")}&format=json`
        }
    }
    request(options, function(error, response, body){
        obj = JSON.parse(body);
        if (error || obj[3][0] === undefined) {
            message.channel.send("Sorry, definition not found.")
            return;
        }
        else {
            message.channel.send(obj[3][0]);
        }
    })
}