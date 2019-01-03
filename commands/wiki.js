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

    rp(options)
        .then(($) => {
            if (!error) {
                obj = JSON.parse($);
                message.channel.send(obj[3][0]);
            }
        })
        .catch((error) => {
            message.channel.send("Your search didn't return anything. Try again?");
            console.log(error);
        })
}