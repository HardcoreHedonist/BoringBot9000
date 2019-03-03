module.exports = (client, reaction, user) => {
    const message = reaction.message;
    if (reaction.emoji.name !=="🏵") return;
    let profile = client.getProfile.get(message.author.id);
    if (!profile) {
        profile = {
          id: `${message.guild.id}-${message.author.id}`,
          user: message.author.id,
          points: 0,
          email:"_",
          name:"_",
          age: 0,
          gender:"_",
          aliases:"_",
          interests:"_",
          bio:"_"
        }
    }
    message.channel.send(`Point added.`)
    profile.points++
    try {
        client.setProfile.run(profile);
    } catch (error) {
        console.log(error);
    }
}