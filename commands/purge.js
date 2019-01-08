exports.run = (client, message, args) => {
    if (message.member.roles.some(r => ["Sovereign", "Overlords"].includes(r.name))){
        
        message.channel.fetchMessages({
            limit: 100,
        }).then((messages) => {
            messages = messages.array().slice(0, ++args[0]);
            message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        });
    }
}