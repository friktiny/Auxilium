const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
//const token = require('./token.json');
const BOT_TOKEN = process.env.BOT_TOKEN;
client.login(BOT_TOKEN/*token.token*/).then(() => {
  client.on('ready', () => {
    client.user.presence.activities = ['Need help ? | ' + BOT_PREFIX + 'help', ['I\'m in maintenance for about', 'minutes', 'hour(s)', 'I am in maintenance for a while...']];
    client.user.setStatus('online');
    console.log(`Auxilium is ${client.user.presence.status} !`);
    client.user.setActivity(client.user.presence.activities[0], { type: 'PLAYING' });
    client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !\nActivity : ` + '`' + 'PLAYING' + ' ' + client.user.presence.activities[0] + '`.')).catch(err => console.error('Error Encountered :' + err));
  });
});


const BOT_DISCRIMINATOR = config.bot_infos.bot_discriminator;
const BOT_NAME = config.bot_infos.bot_name;
const BOT_ID = config.bot_infos.bot_id;
const BOT_PREFIX = config.bot_infos.prefix;

client.on('guildMemberAdd', newMember => {
  const Joueurs = newMember.guild.roles.cache.find(Joueurs => Joueurs.id === '864898505470377984');
  newMember.roles.cache.get(Joueurs);
  newMember.guild.owner.createDM().then(dm => dm.send(`__${newMember.displayName}__ a rejoint ton serveur (**${newMember.guild.name}**) ! :tada::tada:`)).catch(err => console.error(err));
});

client.on('message', message => {
  if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;
  if (message.channel.type == 'dm' && message.author.id !== '754229847206658160') return message.channel.send('Missinon failed, we\'ll try next time.');
  let mentionUser = message.mentions.members.first();
  let mentionChannel = message.mentions.channels.first();
  let mentionRole = message.mentions.roles.first();
  let args = message.content.split(' ').splice();
  var notAuthorizedEmbedMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription('You cannot use this command <@' + message.author.id + '>!');
  const ErrorEmbedMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription(":x: **Error while sending the message.**");
  const SuccessEmbedMessage = new Discord.MessageEmbed().setColor('#008000').setDescription(':white_check_mark: **Successfully sent message!**');
  let muted_member = [];

  // help
  if (message.content == BOT_PREFIX + 'help') {
    const helpEmbedMessage = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Help Command').setAuthor('Add me to your server!', 'https://cdn.discordapp.com/avatars/864899752007827478/485367df72aa7e7241f97567aecb4f11.png?size=128', 'https://leancoding.co/invite.php?v=7H4FTQ.exe').addFields({ name: 'Utilities', value: 'iduser [mention]\nidchannel [mention]\navatar [mention]\ngetinfos *[mention]*nsuggestion *[argument]*', inline: true }, { name: 'Moderation', value: 'mute *[mention]*\nkick *[mention]*\nban *[mention]*', inline: true }, { name: '*argument*', value: 'Required value', inline: false }, { name: 'Bot prefix :', value: BOT_PREFIX, inline: false }).setTimestamp().setFooter('For this bot, thanks to Discord.js, Heroku and GitHub!');
    message.author.createDM().then(channel => {
      channel.send(helpEmbedMessage);
      message.delete();
      console.log('HELP command used by ' + message.author.username + ' to : ' + message.createdAt);
    }).catch(err => {
      message.channel.send("Failed to send DM or run console: " + err);
    });
  };

  // Utility commands


  //avatar [user]
  if (message.content.startsWith(`${BOT_PREFIX}avatar`)) {
    if (mentionUser == undefined) {
      var avatarMySelfEmbedMessage = new Discord.MessageEmbed().setTitle('Your avatar:').setImage(message.author.displayAvatarURL({ format: 'png', size: 2048, dynamic: true })).setColor('#00ffff');
      message.channel.send(avatarMySelfEmbedMessage);
    } else {
      var avatarYourSelfEmbedMessage = new Discord.MessageEmbed().setTitle(`The avatar of ${mentionUser.displayName} :`).setImage(message.guild.members.cache.find(user => user.user.tag === mentionUser.user.tag).user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true })).setColor('#00ffff');
      message.channel.send(avatarYourSelfEmbedMessage);
    }
  }

  //off [time]
  if (message.content.startsWith(`${BOT_PREFIX}off`)) {
    if (!message.author.id === '754229847206658160') {
      message.channel.send(notAuthorizedEmbedMessage);
    } else if (!args) {
      client.user.setStatus('invisible');
      console.log(`Auxilium is ${client.user.presence.status} !`);
      client.user.setActivity(undefined);
      client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !`)).catch(err => console.error('Error Encountered :' + err));
    } else {
      client.user.setStatus('invisible');
      console.log(`Auxilium is ${client.user.presence.status} !`);
      client.user.setActivity(undefined);
      client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !`)).catch(err => console.error('Error Encountered :' + err));
      setTimeout(() => {
        client.user.setStatus('online');
        console.log(`Auxilium is ${client.user.presence.status} !`);
        client.user.setActivity(client.user.presence.activities[0], { type: 'PLAYING' });
        client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !` + '\nActivity : `' + client.user.presence.activities[0] + '`')).catch(err => console.error('Error Encountered :' + err));
      }, args[0] * 10000);
    }
  }
  //on [time] 
  if (message.content.startsWith(`${BOT_PREFIX}on`)) {
    if (!message.author.id === '754229847206658160') {
      message.channel.send(notAuthorizedEmbedMessage);
    } else if (!args) {
      client.user.setStatus('online');
      console.log(`Auxilium is ${client.user.presence.status} !`);
      client.user.setActivity(client.user.presence.activities[0], { type: 'PLAYING' });
      client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !` + '\nActivity : `' + client.user.presence.activities[0] + '`')).catch(err => console.error('Error Encountered :' + err));
    } else {
      client.user.setStatus('online');
      console.log(`Auxilium is ${client.user.presence.status} !`);
      client.user.setActivity(client.user.presence.activities[0], { type: 'PLAYING' });
      client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !` + '\nActivity : `' + client.user.presence.activities[0] + '`')).catch(err => console.error('Error Encountered :' + err));
      setTimeout(() => {
        client.user.setStatus('invisible');
        console.log(`Auxilium is ${client.user.presence.status} !`);
        client.user.setActivity(undefined);
        client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !`)).catch(err => console.error('Error Encountered :' + err));
      }, args[0] * 100000);
    }
  }
  //maintenance [time] [h/m]
  if (message.content.startsWith(`${BOT_PREFIX}maintenance`)) {
    if (!message.author.id === '754229847206658160') {
      message.channel.send(notAuthorizedEmbedMessage);
    } else if (!args) {
      client.user.setStatus('dnd');
      console.log(`Auxilium is ${client.user.presence.status} !`);
      client.user.setActivity(client.user.presence.activities[1[3]], { type: 'STREAMING' });
      client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !` + '\nActivity : `' + client.user.presence.activities[1[3]] + '`')).catch(err => console.error('Error Encountered :' + err));
    } else if (args[2] === 'h') {
      client.user.setStatus('dnd');
      console.log(`Auxilium is ${client.user.presence.status} !`);
      client.user.setActivity(client.user.presence.activities[1[3]], { type: 'STREAMING' });
      client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !` + '\nActivity : `' + client.user.presence.activities[1[3]] + '`')).catch(err => console.error('Error Encountered :' + err));
      setTimeout(() => {
        client.user.setStatus('online');
        console.log(`Auxilium is ${client.user.presence.status} !`);
        client.user.setActivity(client.user.presence.activities[0], { type: 'PLAYING' });
        client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !` + '\nActivity : `' + client.user.presence.activities[0] + '`')).catch(err => console.error('Error Encountered :' + err));
      }, args[0] * 100000);
    } else if (args[2] === 'm') {
      client.user.setStatus('dnd');
      console.log(`Auxilium is ${client.user.presence.status} !`);
      client.user.setActivity(client.user.presence.activities[1[3]], { type: 'STREAMING' });
      client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !` + '\nActivity : `' + client.user.presence.activities[1[3]] + '`')).catch(err => console.error('Error Encountered :' + err));
      setTimeout(() => {
        client.user.setStatus('online');
        console.log(`Auxilium is ${client.user.presence.status} !`);
        client.user.setActivity(client.user.presence.activities[0], { type: 'PLAYING' });
        client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !` + '\nActivity : `' + client.user.presence.activities[0] + '`')).catch(err => console.error('Error Encountered :' + err));
      }, args[0] * 10000);
    } else if (!args[2] === 'm' || !args[2] === 'h') {
      message.reply('hours or minutes ?');
    }
  }

  //getInfosUser [mention]
  if (message.content.startsWith(`${BOT_PREFIX}getInfosUser`)) {
    if (mentionUser == undefined) {
      message.channel.send('Who do you want the information from?');
    } else {
      let infosUserEmbedMessage = new Discord.MessageEmbed().setColor(mentionUser.displayHexColor).setAuthor(mentionUser.nickname, mentionUser.user.displayAvatarURL()).setImage(mentionUser.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true })).setTitle(mentionUser.user.tag).setDescription(`Inscribed since ${mentionUser.user.createdAt}`).addField('Last message published:', mentionUser.lastMessage.content, true).addField('Status:', mentionUser.user.presence.status, true).addField('Has been in the server since:', mentionUser.joinedAt, false);
      message.channel.send(infosUserEmbedMessage);
    }
  }

  //clean [count]
  if (message.content.startsWith(`${BOT_PREFIX}clean`)) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      message.channel.send(notAuthorizedEmbedMessage);
    } else {
      if (args[0] === undefined) {
        let cleanSyntaxEmbedMessage = new Discord.MessageEmbed().setTitle('Clean Syntax').setColor('LIGHTGREEN').setDescription("**Syntax** :\n`$clean [number of messages to be deleted in THIS channel]\n$clean [number of messages to be deleted in THIS channel] [User/Show Mention]``Example** :\n`$clean 26 @Nat76\nclean 12 #general`");
        message.channel.send(cleanSyntaxEmbedMessage);
      } else if (!parseFloat(args[0]) === Number) {
        message.reply('it doesn\'t seem to be a number!');
      } else {
        message.delete();
        do {
          var deletedMessage = 0;
          message.channel.lastMessage.delete({ reason: `Cleaned for ${message.member.nickname}` });
          deletedMessage++;
        } while (deletedMessage < args[0])
      }
    }
  }


  //getInfosServer
  if (message.content == `${BOT_PREFIX}getInfosServer`) {
    let infosServerEmbedMessage = new Discord.MessageEmbed().setColor('#3af24b').setTitle(message.guild.name).setDescription('Was created on ' + message.guild.createdAt + ` by **${message.guild.owner.user.tag}**`).setThumbnail(message.guild.iconURL()).addFields({ name: 'Region', value: message.guild.region, inline: true }, { name: 'Number of members', value: message.guild.memberCount.toString(), inline: true }, { name: 'MFA Level', value: message.guild.mfaLevel, inline: true }, { name: 'General channel', value: message.guild.systemChannel, inline: false }).setImage(message.guild.bannerURL({ format: "png", size: 512 }));
    message.channel.send(infosServerEmbedMessage);
  }

  //iduser[mention]
  if (message.content.startsWith(BOT_PREFIX + 'iduser')) {
    if (mentionUser == undefined) {
      message.channel.send('User not or wrongly mentioned');
    } else {
      message.channel.send(new Discord.MessageEmbed().setColor("#159d7f").setTitle(mentionUser.user.tag).setDescription(`Did you want it? Here it is!\n\`__${mentionUser.id}__\``));
    };
  };

  //idchannel [channel]
  if (message.content.startsWith(BOT_PREFIX + 'idchannel')) {
    if (mentionChannel == undefined) {
      message.channel.send('Channel not or incorrectly mentioned');
    } else {
      message.channel.send(new Discord.MessageEmbed().setColor("#159d7f").setTitle(mentionChannel.name).setDescription(`Did you want it? Here it is!\n\`__${mentionChannel.id}__\``));
    };
  };

  //suggestion [argument]
  if (message.content.startsWith(BOT_PREFIX + 'suggestion')) {
    if (args == undefined) {
      message.reply("you didn't write down your suggestion, write it down with a space after suggestion and dashes between each word. Like this:\n" + BOT_PREFIX + "suggestion Here's-my-suggestion.");
    } else {
      fs.appendFile('suggestion.txt', message.author.tag + ' ' + message.guild.name + ' ' + message.createdAt + '\n' + message.content.slice(11, -0) + '\n\n', err => {
        console.log(message.author.tag + ' has a suggestion: ' + message.content.slice(11, -0) + ' at : ' + message.createdAt);
        if (err) message.channel.send(ErrorEmbedMessage);
        else message.channel.send(SuccessEmbedMessage);
      })
    };
  };

  //End utilities commands
  //Moderation commands

  //restart
  if (message.content == BOT_PREFIX + 'restart') {
    if (message.author.id !== '754229847206658160') {
      message.channel.send(notAuthorizedEmbedMessage);
    } else {
      message.channel.send('Restarting...');
      console.log('Client restarted at ' + message.createdAt);
      client.destroy();
      client.login(BOT_TOKEN);
      client.user.setStatus('online');
      console.log(`Auxilium is ${client.user.presence.status} !`);
      client.user.setActivity(client.user.presence.activities[0], { type: 'PLAYING' });
      client.users.cache.find(user => user.tag === 'TryHackMe#3958').createDM().then(dm => dm.send(`Now, I'm ${client.user.presence.status} !` + '\nActivity : `' + client.user.presence.activities[0] + '`')).catch(err => console.error('Error Encountered :' + err));
      message.delete();
      message.channel.send('Bot successfully restarted!');
    };
  };

  //setName [nickname]
  if (message.content.startsWith(`${BOT_PREFIX}setName`)) {
    if (args[0] == undefined) {
      message.reply('name not defined!');
    } else if (message.member.hasPermission('MANAGE_GUILD')) {
      if (args[0 == 'default']) {
        message.guild.me.setNickname(BOT_NAME);
        let setDefaultNameEmbedMessage = new Discord.MessageEmbed().setColor('BLACK').setTitle('Nickname given by default!').setDescription(`The nickname ${message.guild.me.nickname} has been removed :white_check_mark: !`);
        message.channel.send(setDefaultNameEmbedMessage);
      } else {
        let setNameEmbedMessage = new Discord.MessageEmbed().setColor('BLACK').setTitle('Nickname changed!').setDescription('The nickname `' + message.guild.me.nickname + '` has been replaced by `' + args[1] + '` !');
        message.guild.me.setNickname(args[1]);
        message.channel.send(setNameEmbedMessage);
      }
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }

  //ban [user] [time] [reason]
  if (message.content.startsWith(`${BOT_PREFIX}ban`)) {
    if (message.member.hasPermission('BAN_MEMBERS')) {
      if (mentionUser == undefined) {
        return message.channel.send("Mention the user you want to ban.");
      } else if (!args[1] == undefined) {
        message.channel.send('Missing ban duration. (days)');
      } else if (ars[2] == undefined) {
        message.channel.send('Missing ban reason.');
      } else if (!parseFloat(args[1]) < 356) {
        message.channel.send('You can\'t ban a user for more than a year!');
      } else if (message.content.slice(4 + args[0].length + 1 + args[1].length + 1).length < 50) {
        message.channel.send('The ban reason must be longer!');
      } else if (mentionUser.bannable) {
        mentionUser.ban({ days: parseFloat(args[1]), reason: message.content.slice(5 + args[0].length + 1 + args[1].length + 1) }).then(user => {
          message.channel.send(`@${user.displayName} has been banned.`);
          message.delete();
          message.channel.lastMessage.delete({ timeout: 5000 });
          message.guild.systemChannel.send(`${mentionUser.displayName} played with fire, and got burned.`);
          user.createDM().then(channel => {
            channel.send('You have been banned from the server' + message.guild.name + ': ' + message.content.slice(4 + args[0].length + 1 + args[1].length + 1) + 'You will be able to rejoin the server in ' + args[1] + ' days');
          }).catch(err => console.error('Error Encountered :' + err));
        }).catch(err => {
          message.channel.send(':x: **Error**, ' + err);
        });
      } else {
        message.reply(`you can't ban ${mentionUser.displayName} !`);
      }
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }
  //kick [user] [reason]
  else if (message.content.startsWith(`${BOT_PREFIX}kick`)) {
    if (message.member.hasPermission('KICK_MEMBERS')) {
      if (mentionUser == undefined) {
        message.channel.send("Mention the user you want to kick.");
      } else if (args[2] == undefined) {
        message.channel.send('Missing reason.');
      } else if (message.content.slice(6 + args[0].length + 1) < 15) {
        message.channel.send('The kick reason must be longer!');
      } else if (mentionUser.kickable) {
        mentionUser.kick(message.content.slice(6 + args[0].length + 1)).then(user => {
          message.channel.send(`${mentionUser.displayName} has been kicked.`);
          message.delete();
          message.channel.lastMessage.delete({ timeout: 5000 });
          message.guild.systemChannel.send(`${mentionUser.displayName} leaned too far out the window and fell!\nThank God he had a parachute!`)
          user.createDM().then(channel => {
            channel.send(`You\'ve been kicked from the server ${message.guild.name}: ${message.content.slice(6 + args[0].length + 1)} You can come back anytime! ||with a new invite...||`);
          });
        }).catch(err => {
          message.channel.send(':x: **Error**, ' + err);
        });
      } else {
        message.reply(`you can't ban ${mentionUser.displayName}`);
      }
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }
  //mute [user] [reason]
  else if (message.content.startsWith(`${BOT_PREFIX}mute`)) {
    if (message.member.hasPermission('MUTE_MEMBERS')) {
      if (mentionUser = undefined) {
        message.channel.send("Mention the user you want to mute.");
      } else if (mentionUser.hasPermission('ADMINISTRATOR')) {
        mentionUser.voice.setMute(true, message.content.slice(6 + args[0].length + 1)).then(user => {
          message.reply(`${mentionUser.displayName} has been muted.`);
          muted_member.push(mentionUser.user.tag);
          message.delete();
          message.channel.lastMessage.delete({ timeout: 5000 });
          user.createDM().then(dm => dm.send(`You've been muted in the ${message.guild.name} server : ${message.content.slice(6 + args[0].length + 1)}.`))
        }).catch(err => message.reply(`I was not able to mute ${mentionUser.displayName} : ${err}`));
      }
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }
  //unmute [user]
  else if (message.content.startsWith(`${BOT_PREFIX}unmute`)) {
    if (message.member.hasPermission('MUTE_MEMBERS')) {
      if (mentionUser == undefined) {
        message.channel.send("Mention the user you want to unmute.");
      } else {
        mentionUser.voice.setMute(false, 'Unmuted');
        message.reply(`${mentionUser.displayName} has been unmuted`);
        muted_member.splice(mentionUser.user.tag, 1);
      }
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }

  //ping
  if (message.content == `${BOT_PREFIX}ping'`) {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.channel.send('Pong !' + '\n`' + timeTaken + 'ms`');
    message.react("🏓");
  }

  //End moderation commands


  if (message.author.tag == muted_member[0 - muted_member.length]) {
    message.delete({ reason: 'This user has been muted' });
  }
});