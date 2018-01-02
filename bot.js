const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Discord.Client();
const spongebob = new Discord.Attachment("./assets/spongebob.jpg");
var memes = "";
var help = "";
var cliplist = "";
var voiceChannel; 


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
	fs.readFile("./help.txt", "utf-8", (err,data)  => {
		if (err) throw err;
		help = data;
		cliplist = help.split("\n");
		cliplist = cliplist.slice(cliplist.indexOf("Audio clips (!pf <clipname>):\r") + 1);
		for(let i = 0; i < cliplist.length; i++){
			if (cliplist[i].endsWith("\r")){
				cliplist[i] = cliplist[i].slice(0, -1);
			}
		}
	});
});

client.on("message", message => {
	
	if(message.author.bot) return; //if message is from the bot itself, ignore
  
	if(message.content.indexOf(config.prefix) !== 0) return; //if message doesn't start with prefix, ignore

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command == "dc"){
		if(message.author.id == 90165848467070976){
			if(voiceChannel){
				if(voiceChannel.connection){
					voiceChannel.leave();
				}
			}
			message.delete();
			setTimeout(function() {
				client.destroy();
				process.exit();
			}, 1000);
			
		}
		else{
			message.channel.send("You don't have permission to use this command!")
			.then(sentMessage => sentMessage.delete(3000));
		}
		
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
		message.author.send(help);
	}
	if(command == "purge") {
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
	if (command == "enter"){
		if(!voiceChannel){
			voiceChannel = client.channels.get('219550009928974336');
			voiceChannel.join();
		}
	}
	if (command == "exit" || command == "fuckoff"){
		if(voiceChannel){
			voiceChannel.leave();
			voiceChannel = null;
		}
	}
	if (command == "pf"){
		if (voiceChannel){
			if (args.length == 0){
				message.channel.send("Include a filename!")
				.then(sentMessage => sentMessage.delete(3000));
			}
			else {
				const str = args.join("");
				if (cliplist.includes(str)){
					voiceChannel.connection.playFile("./assets/" + str + ".wav");
				}
				else {
					message.channel.send("No such file!")
					.then(sentMessage => sentMessage.delete(3000));
				}
			}
		}
		else{
			message.channel.send("Bot isn't connected!")
			.then(sentMessage => sentMessage.delete(3000));
		}
		
	}
	if (command == "update"){
		if(message.author.id == 90165848467070976){
			fs.readFile("./assets/memes.txt", "utf-8", (err, data) => {
				if (err) throw err;
				memes = data.split("\n");
				for(let i = 0; i < memes.length; i++){
					if (memes[i].endsWith("\r")){
						memes[i] = memes[i].slice(0, -1);
					}
				}
			});
			fs.readFile("./help.txt", "utf-8", (err,data)  => {
				if (err) throw err;
				help = data;
				cliplist = help.split("\n");
				cliplist = cliplist.slice(cliplist.indexOf("Audio clips (!pf <clipname>):\r") + 1, cliplist.indexOf("NOTE:\r") - 1);
				for(let i = 0; i < cliplist.length; i++){
					if (cliplist[i].endsWith("\r")){
						cliplist[i] = cliplist[i].slice(0, -1);
					}
				}
			});
		console.log("Files updated!");
		}
		else{
			message.channel.send("You don't have permission to use this command!")
			.then(sentMessage => sentMessage.delete(3000));
		}
	}
	message.delete(1000);
});
	
client.on("voiceStateUpdate", (oldMember, newMember) => {
  	let newUserChannel = newMember.voiceChannel
  	let oldUserChannel = oldMember.voiceChannel

  	if(oldUserChannel === undefined && newUserChannel !== undefined) {
  		if(newMember.id == 160463230001610753){
  			newUserChannel.join().then(connection =>
  			{
  				const dispatcher = connection.playFile("./assets/cody.wav");
  				dispatcher.on("end", end => {
  					newUserChannel.leave();
  				});
  			}).catch(err => console.log(err));
  		}
  		if (newMember.id != 257983171331751946){
			let usedName = "";
			if (!newMember.nickname){
				usedName = newMember.user.username;
			}
			else {
				usedName = newMember.nickname;
			}
  			client.guilds.first().channels.first().send("hey, its " + 
	  		usedName + "! what's brackin bruh, how you livin")
	  		.then(sentMessage => sentMessage.delete(10000));
  		}

  	} else if(newUserChannel === undefined){

    // User leaves a voice channel

  	}
});

	client.login(config.token);