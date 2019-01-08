module.exports = (client, reaction, user) => {
    const message = reaction.message;
    if (reaction.emoji.name !=="🏵") return;
    let profile = client.getProfile.get(message.author.id);
    if (!profile) {
        profile = {
          id: `${message.guild.id}-${message.author.id}`,
          user: message.author.id,
          points: 0,
          email: ""
        }
    }
    message.channel.send(`Point removed.`)
    profile.points--
    client.setProfile.run(profile);
}