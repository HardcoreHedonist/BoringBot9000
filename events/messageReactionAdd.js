module.exports = (client, reaction, user) => {
    const message = reaction.message;
    if (reaction.emoji.id !=="530573677004324866") return;
    let profile = client.getProfile.get(message.author.id);
    if (!profile) {
        profile = {
          id: `${message.guild.id}-${message.author.id}`,
          user: message.author.id,
          points: 0,
          email: ""
        }
    }
    profile.points++
    client.setProfile.run(profile);
}