var dbd = require("dbd.js")
var fs = require("fs")

const bot = new dbd.Bot({
token: "ODAxMDQ2NTA2Nzg2MzkwMDU2.YAa-sQ.uWBHxSePk19QYfy_Qri9GJT_NT0",
prefix: "$getServerVar[prefix]"
})
 
bot.status({
  text: "with $allMembersCount members! |.gg/twitchbots",
  type: "PLAYING",
  time: 12
})

bot.command({
	name: 'ticket-setup',
	code: `
 $awaitMessages[$authorID;30s;everything;tsp2;Command has been cancelled]
 $sendMessage[**Which Category Do you want to make For Ticket System.
 Provide the Category ID. 
 This Command will be cancelled after** \`30 seconds\`.;no]
 $onlyPerms[admin;You Dont Have Prem To Use this Command{delete:10s}]
 $suppressErrors[]`
});

bot.awaitedCommand({
	name: 'tsp2',
	code: `
**Successfully Setuped Ticket Channel!📫**
 $setServerVar[ticketchannel;$message]
 $onlyIf[$channelExists[$message]==true;Provided Category Doesn't Exist{delete:10s}]
 $onlyIf[$isNumber[$message]==true;Please provide Category ID{delete:10s}]`
});

bot.command({
	name: 'ticket',
	code: `
$newTicket[ticket-$username[$authorID];{title:Ticket opened!}{description:Hello, <@$authorID>. Here is your ticket!:tickets: Please give the information about your problem or feedback. 
}{footer:Use !close to close your ticket};$getServerVar[ticketchannel];no;<@$authorID>, I failed to create your ticket! Try again]
$sendMessage[Open;Something went wrong]`
});

bot.command({
	name: 'close',
	code: `
$closeTicket[This is not a ticket]
$onlyIf[$checkContains[$channelName;ticket]==true;{description:This command can only be used in ticket channel!} {color:RED} {delete:10s}]
$suppressErrors`
});

bot.onMessage()

 // Variable
bot.variables({
 prefix: "!",
 warn: "0",
 ticketchannel: '829868551325351976',
 color:"purple"
})

 //commands handler
var reader = fs.readdirSync("./commands/").filter (file => file.endsWith(".js"))
for(const file of reader) {
  const command = require(`./commands/${file}`)
  bot.command({
name: command.name, 
code: command.code
  })
}


