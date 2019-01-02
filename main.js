const Discord = require("discord.js");
const request = require("request");
const fs = require("fs");
const Enmap = require("enmap");
const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

fs.readdir("./events", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`)
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client))
        delete require.cache[require.resolve(`./events/${file}`)]
    })
});

client.commands = new Enmap()

fs.readdir("./commands", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let props = require(`./commands/${file}`)
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});

client.login(config.token);