const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Discord.Client();
const spongebob = new Discord.Attachment("./assets/spongebob.jpg");
var memes = "";


client.on("ready", () => {
	console.log("Logged in as " + client.user.username + "!");
	fs.readFile("./assets/memes.txt", "utf-8", (err, data) => {
		if (err) throw err;
		memes = data.split("\n");
		for(let i = 0; i < memes.length; i++){
			if (memes[i].endsWith("\r")){
				memes[i] = memes[i].slice(0, -1);
			}
		}
	});
});

client.on("message", message => {
	
	if(message.author.bot) return;
  
	if(message.content.indexOf(config.prefix) !== 0) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command == "dc"){
		message.delete();
		client.destroy();
	}
	if (command == "meme"){
		let random = Math.floor(Math.random() * memes.length);
		message.channel.send(memes[random]);
	}
	if (command == "sk8r"){
		message.channel.send("https://www.youtube.com/watch?v=jiTfrqkq7nY"); 
	}
	if (command == "ping"){
		message.channel.send("suh dude");
	}
	if (command == "help"){
		message.author.send(config.help);
	}
	if(command === "purge") {
		const messagecount = parseInt(args[0], 10);
		message.channel.fetchMessages({limit: messagecount + 1}).then(messages => message.channel.bulkDelete(messages));
	}
	if (command == "sb"){
		if (args.length == 0){
			message.channel.send("Include a message, faggot.")
			.then(sentMessage => sentMessage.delete(3000));
		}
		else {
			const str = args.join(" ");
			let res = "";
			for (let i = 0; i < str.length; i++){
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
			const str = args.join(" ");
			let res = "";
			for (var i = 0; i < str.length; i++){
				res += str.charAt(i) + " ";
			}
			message.channel.send(res);
		}
	}
	if (command == "ayylmao"){
		let voiceChannel= client.channels.get('219550009928974336');
		voiceChannel.join().then(connection =>
		{
			const dispatcher = connection.playFile("./assets/ayylmao.wav");
			dispatcher.on("end", end => {
				voiceChannel.leave();
			});
		}).catch(err => console.log(err))
	}
	});
	
client.on("voiceStateUpdate", (oldMember, newMember) => {
  	let newUserChannel = newMember.voiceChannel
  	let oldUserChannel = oldMember.voiceChannel

  	if(oldUserChannel === undefined && newUserChannel !== undefined) {
  		if(newMember.id == 90165848467070976){
  			newUserChannel.join().then(connection =>
  			{
  				const dispatcher = connection.playFile("./assets/cody.wav");
  				dispatcher.on("end", end => {
  					newUserChannel.leave();
  				});
  			}).catch(err => console.log(err));
  		}
  		if (!newMember.id == 257983171331751946){
  			client.guilds.first().channels.first().send("hey, its " + 
	  		newMember.nickname + "! what's brackin bruh, how you livin")
	  		.then(sentMessage => sentMessage.delete(10000));
  		}

  	} else if(newUserChannel === undefined){

    // User leaves a voice channel

  	}
})

	client.login(config.token);