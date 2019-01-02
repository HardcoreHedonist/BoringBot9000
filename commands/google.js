const rp = require("request-promise");
const cheerio = require("cheerio");

exports.run = (client, message, args) => {

    message.channel.send("I'm on strike...bitch");

    var query = args.join(" ");

    const options = {
        uri : `https://www.google.com.au/search?client=opera&q=${query}&sourceid=opera&ie=UTF-8&oe=UTF-8`,
        transform : (body) => {
                return cheerio.load(body);
        }
    };

    rp(options)
        .then(($) => {
            console.log(body);
        })
        .catch((err) => {console.log(err);})
}
//AIzaSyCvYQfVKoOPH38_8RILLpHeb2Fd84-_YY8