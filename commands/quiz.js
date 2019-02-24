exports.run = async (client, message, args) => {

    if (args.shift() == "start"){

        request(`https://api.quizlet.com/2.0/sets/${args[0]}?client_id=R3snf5zu9W&whitespace=1`, function(error, response, body)
        {
            if (error){message.channel.send("Poof. That quizlet doesn't seem to exist.");}
            else{
                Quiz = JSON.parse(body);
                const embed = {            
                    "title": `${Quiz.title}`,
                    "description": `${Quiz.description}`,
                    "color": 2374080,
                    "timestamp": message.createdTimestamp,
                    "footer": {
                    "text": `Requested by ${message.member.displayName}`,
                    "icon_url": `${message.author.avatarURL}`
                    },
                    "author": {
                        "name": `${Quiz.created_by}`,
                    },
                    "fields": [
                        {
                            "name": "Terms",
                            "value": `${Quiz.term_count}`,
                        }
                      ]
                }
                message.channel.send({embed});
                message.channel.send(`\n\nType +play to join in!\nThe match begins in **1 minute**.`);
                
            }
        })

        class Player {
            constructor(name) {
                this.points = 0;
                this.name = name;
            }
        }

        const Players = [];

        let coll = await message.channel.awaitMessages(() => true, {time: 60000, max: 200})
        coll.array().forEach(element => {
            if (element.content.startsWith("+play")){
                player = new Player(element.member, 0);
                Players.push(player)
            }
        });
        message.channel.send(`The players are: `);

        Players.forEach(element => {
            message.channel.send(`${element.name}  **-**  Correct: ${element.points}`);
        });

        message.channel.send(`Quiz starts __now__! You have **10** seconds to answer each question`)
        
        /*var count=5;
        
        function timer()
        {
          if (count < 1)
          {
             clearInterval(counter);
             return;
          }
          message.channel.send(`${count}`);
          count --;
        }
        var counter= await setInterval(timer, 1000);*/

        for (var pair=0; pair<Quiz.terms.length;) {
            await message.channel.send(`**\n${Quiz.terms[pair].definition}\n**`)
            .then(
                await message.channel.awaitMessages(() => true, {time: 10000, max: 200})
                .then( (coll) =>{
                    for (i=0; i<Players.length; i++){
                        coll.array().forEach((answer) => {
                            if (answer.member == Players[i].name){
                                if (editDistance(Quiz.terms[pair].term.toLowerCase(), answer.content.toLowerCase()) < 3){
                                    Players[i].points++;
                                }
                            }
                        })
                    }
                    Players.forEach((element, no) => {
                        no++;
                        message.channel.send(`\n${element.name}  **-**  Correct: ${element.points}\n`);
                    });
                    pair++;
                })
            );
        }
        message.channel.send("Quiz ended!")

    }
    function editDistance (a,b) {
        if(!a || !b) return (a || b).length;
        var m = [];
        for(var i = 0; i <= b.length; i++){
            m[i] = [i];
            if(i === 0) continue;
            for(var j = 0; j <= a.length; j++){
                m[0][j] = j;
                if(j === 0) continue;
                m[i][j] = b.charAt(i - 1) == a.charAt(j - 1) ? m[i - 1][j - 1] : Math.min(
                    m[i-1][j-1] + 1,
                    m[i][j-1] + 1,
                    m[i-1][j] + 1
                );
            }
        }
        return m[b.length][a.length];
    };
}