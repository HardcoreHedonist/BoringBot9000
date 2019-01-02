exports.run = (client, message, args) => {
    let member = message.member;
    var joinRole = args[0];
    let role = message.guild.roles.find(r => r.name == `${joinRole}`);

    if (!role){
        message.channel.send(`Sorry! I can't find the role '${joinRole}'. Please check spelling and try again.`)
    
    }
    else {
        message.channel.send(`You have joined ${joinRole}!`);
    }
    member.addRole(role).catch(console.error);
}