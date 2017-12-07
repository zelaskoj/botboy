const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const spongebob = new Discord.Attachment("./assets/spongebob.jpg");

client.on("ready", () => {
	console.log("Logged in as " + client.user.username + "!");
});

client.on("message", message => {

	if(message.author.bot) return;
  
	if(message.content.indexOf(config.prefix) !== 0) return;

	// Here we separate our "command" name, and our "arguments" for the command. 
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command == "dc"){
		message.delete();
		client.destroy();
	}
	if (command == "ping"){
		message.channel.send("suh dude");
	}
	/*if (command == "cleanup"){
		if (args.length == 0){
			message.channel.send("Gotta specify how many messages to clean up!")
			.then(sentMessage => sentMessage.delete(3000));
		}
		else if (parseInt(args[0]) == "NaN"){
			message.channel.send("Gotta make sure you specify a number and not anything else!")
			.then(sentMessage => sentMessage.delete(3000));
		}
		else{
			var count = parseInt(args[0]);
			var messageList = message.channel.messages({before: message.id, limit: 1000})
			while(count != 0){
				var msg = messagesList.last();
				if (msg.author.id == client.user.id){
					msg.delete();
					count--;
				}
			}
		}
	}*/
	if (command == "sb"){
		if (args.length == 0){
			message.channel.send("Include a message, faggot.")
			.then(sentMessage => sentMessage.delete(3000));
		}
		else {
			var str = args.join(' ');
			var res = '';
			for (var i = 0; i < str.length; i++){
				if (i % 2 == 0){
					res += str.charAt(i).toLowerCase();
				}
				else {
					res += str.charAt(i).toUpperCase();
				}
			}
			message.channel.send(res, spongebob);
		}
	}
	if (command == "ae"){
		if (args.length == 0){
			message.channel.send("Include a message, faggot.")
			.then(sentMessage => sentMessage.delete(3000));
		}
		else{
			var str = args.join(' ');
			var res = '';
			for (var i = 0; i < str.length; i++){
				res += str.charAt(i) + " ";
			}
			message.channel.send(res);
		}
	}
	});
	
client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {
	  client.guilds.first().channels.first().send("hey, its " + 
	  newMember.nickname.toLowerCase() + "! what's brackin bruh, how you livin")
	  .then(sentMessage => sentMessage.delete(10000));

  } else if(newUserChannel === undefined){

    // User leaves a voice channel

  }
})

	client.login(config.token);