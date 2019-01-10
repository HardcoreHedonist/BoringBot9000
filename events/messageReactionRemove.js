module.exports = (client, reaction, user) => {
    const message = reaction.message;
    if (reaction.emoji.name !=="🏵") return;
    let profile = client.getProfile.get(message.author.id);
    
    message.channel.send(`Point removed.`)
    profile.points--
    client.setProfile.run(profile);
}