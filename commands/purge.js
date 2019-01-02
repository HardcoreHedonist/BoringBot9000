exports.run = (client, message, args) => {
    message.channel.fetchMessages({
        limit: 100,
    }).then((messages) => {
        messages = messages.array().slice(0, ++args[0]);
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });
}