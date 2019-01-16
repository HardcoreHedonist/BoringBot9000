exports.run = (client, message, args) => {

    cmd = args.shift();
    const member = message.mentions.members.first();
    if (member){
        var profile = client.getProfile.get(member.id);
        if (!profile) {
            profile = {
              id: `${message.guild.id}-${message.author.id}`,
              user: message.author.id,
              points: 0,
              email:"_",
              name:"_",
              age: 0,
              pronouns:"_",
              aliases:"_",
              interests:"_",
              bio:"_"
            }
        const embed = {
            "title": `Bio:`,
            "description": `${profile.bio}`,
            "color": member.displayColor,
            "timestamp": message.createdTimestamp,
            "footer": {
            "text": `Requested by ${message.member.displayName}`,
            "icon_url": `${message.author.avatarURL}`
            },
            "thumbnail": {
            "url": `${member.user.avatarURL}`
            },
            "author": {
            "name": `${member.displayName}                                        ${profile.points} points`,
            "icon_url": `${member.user.avatarURL}`
            },
            "fields": [
            {
                "name": "Interests:",
                "value": `${profile.interests}\n`,
                "inline": true
            },
            {
                "name": "Aliases:",
                "value": `${profile.aliases}`,
                "inline": true
            },
            {
                "name": "Name:",
                "value": `${profile.name}`,
                "inline": true
            },
            {
                "name": "Email:",
                "value": `${profile.email}`,
                "inline": true
            },
            {
                "name": "Age:",
                "value": `${profile.age}`,
                "inline": true
            },
            {
                "name": "Pronouns:",
                "value": `${profile.pronouns}`,
                "inline": true
            }
            ]
        };
        message.channel.send(`User Profile for ${member.displayName}`, { embed }).catch(err => message.channel.send("Damn! It looks like you haven't completed your profile. You should go do that."));
        }
    }
    else {
        var profile = client.getProfile.get(message.author.id);
    }

    if (!profile) {
        profile = {
          id: `${message.guild.id}-${message.author.id}`,
          user: message.author.id,
          points: 0,
          email:"_",
          name:"_",
          age: 0,
          pronouns:"_",
          aliases:"_",
          interests:"_",
          bio:"_"
        }
    }

    switch(cmd){
        case "name":
            const name = args.join(" ");
            message.channel.send(`Hi there ${name}! That's a pretty phenominal name.`);
            profile.name = name;
            break;
        case "age":
            const age = args[0];
            message.channel.send(`${age} huh? On average, people your age have ${83 - age} more years of life.`);
            profile.age = age;
            break;
        case "pronouns":
            const pronouns = args.join(" ");
            message.channel.send(`You go by ${pronouns}. Me? Call me whatever you want. I'm a bot.`);
            profile.pronouns = pronouns;
            break;
        case "email":
            const email = args[0];
            message.channel.send(`So your email is *${email}*. Pretty boring. Almost as boring as I am.`);
            profile.email = email;
            break;
        case "aliases":
            args = args.join(" ");
            args = args.split(",");
            aliases = args.join("\n");
            message.channel.send(`So your other accounts are: \n ${aliases}\n\n I never knew you were so *popular*!`);
            profile.aliases = aliases;
            break;
        case "interests":
            args = args.join(" ");
            args = args.split(",");
            interests = args.join("\n");
            message.channel.send(`You're interested in: \n ${interests}\n\n Sounds fun!`);
            profile.interests = interests;
            break;
        case "bio":
            bio = args.join(" ");
            message.channel.send(`So you think of yourself as *${bio}*. A bit conceited, but whatever.`)
            profile.bio = bio;
            break;                
    };
    
    client.setProfile.run(profile);
}