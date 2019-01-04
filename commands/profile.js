exports.run = (client, message, args) => {
    let profile = client.getProfile.get(message.author.id);
    if (!profile) {
        profile = {
          id: `${message.guild.id}-${message.author.id}`,
          user: message.author.id,
          points: 0,
          email: ""
        }
    }
    message.channel.send(profile.points)
}