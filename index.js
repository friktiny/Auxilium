const Discord = require("discord.js") ;
const client = new Discord.Client() ;
const BOT_TOKEN = process.env.BOT_TOKEN ;
client.login(BOT_TOKEN).then(() => {
  client.on('ready', () => {
   console.log('Auxilium is operational !') ;
   client.channels.cache.get('864953618938986516').send('**' + BOT_NAME + '** is up and running!') ;
   client.user.setActivity(' Need help ? | ' + BOT_PREFIX + 'help', {type : 'PLAYING'}) ;
   }) ; 
}) ;

const BOT_DISCRIMINATOR = process.env.BOT_DISCRIMINATOR ;
const BOT_NAME = process.env.BOT_NAME ;
const BOT_ID = process.env.BOT_ID ;
const BOT_PREFIX = process.env.BOT_PREFIX ;

client.on('guildMemberAdd', newMember => {
 // const Player = newMember.
  newMember.roles.cache.get('864898505470377984').guild.members.cache.get(newMember.id).roles.add() ;
}) ;

client.on('message', message => {
  if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return ;
  if (message.channel.type == 'dm' && message.author.id !== '754229847206658160') return ;
  let mentionUser = message.mentions.members.first() ;
  let mentionChannel = message.mentions.channels.first() ;
  let mentionRole = message.mentions.roles.first() ;
  let args = message.content.split(' ') ;
  var notAuthorizedEmbedMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription('You cannot use this command <@' + message.author.id + '>!') ;
  const ErrorEmbedMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription(":x: **Error while sending the message.**") ;
  const SuccessEmbedMessage = new Discord.MessageEmbed().setColor('#008000').setDescription(':white_check_mark: **Successfully sent message!**') ;
  //var notes = [] ;
  const endMessage = args ;
  
  // help
  if (message.content == BOT_PREFIX + 'help') {
  const helpEmbedMessage = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Help Command').setAuthor('Add me to your server!', 'https://cdn.discordapp.com/avatars/864899752007827478/485367df72aa7e7241f97567aecb4f11.png?size=128', 'https://discord.com/api/oauth2/authorize?client_id=864899752007827478&permissions=8&scope=bot'). addFields({name : 'Utilities', value : 'iduser [mention]\nidchannel [mention]\navatar [mention]\ngetinfos *[mention]*nsuggestion *[argument]*', inline : true}, {name: 'Moderation', value : 'mute *[mention]*\nkick *[mention]*\nban *[mention]*', inline : true}, {name : 'Bot prefix :',value : BOT_PREFIX, inline : false}). addField('*argument*', 'Required value', false).setTimestamp().setFooter('For this bot, thanks to Discord.js, Heroku and GitHub!') ;
      message.author.createDM().then(channel => {
      channel.send(helpEmbedMessage) ;
       message.delete() ;
      console.log('HELP command used by ' + message.author.username + ' to : ' + message.createdAt);
       }).catch(err => {
       message.channel.send("Failed to send DM or run console: " + err) ;
       }) ;
  } ;
  
  // Utility commands
  
  //setPrefix [argument]
  if (message.content.startsWith(`${BOT_PREFIX}setPrefix`)) {
    if (args[1] == undefined) {
    message.reply('undefined prefix!') ;
  } else if (message.member.hasPermission('MANAGE_GUILD')) {
      let setPrefixEmbedMessage = new Discord.MessageEmbed().setColor('BLACK').setTitle('Prefix changed!').setDescription('The prefix `' + BOT_PREFIX + '` has been replaced by `' + args[1] + '` !' ) ;
      message.channel.send(setPrefixEmbedMessage) ;
      BOT_PREFIX = args[1] ;
    } else {
      message.channel.send(notAuthorizedEmbedMessage) ;
    }
  }
  
  //setName [argument]
  if (message.content.startsWith(`${BOT_PREFIX}setName`)) {
    if (args[1] == undefined) {
      message.reply('name not defined!') ;
    } else if (message.member.hasPermission('MANAGE_GUILD')) {
      let setNameEmbedMessage = new Discord.MessageEmbed().setColor('BLACK').setTitle('Nickname changed!').setDescription('The nickname `' + LOCAL_BOT_NAME + '` has been replaced by `' + args[1] + '` !' ) ;
      message.guild.me.setNickname(args[1]) ;
      message.channel.send(setNameEmbedMessage) ;
    } else {
      message.channel.send(notAuthorizedEmbedMessage) ;
    }
  }

  //avatar [argument]
  if (message.content.startsWith(BOT_PREFIX + 'avatar')) {
    if (mentionUser == undefined) {
      var avatarMySelfEmbedMessage = new Discord.MessageEmbed().setTitle('Your avatar:').setImage(message.author.displayAvatarURL({format : 'png', size : 2048, dynamic : true})).setColor('#00ffff') ;
      message.channel.send(avatarMySelfEmbedMessage) ;
    } else {
      var avatarYourSelfEmbedMessage = new Discord.MessageEmbed().setTitle(`The avatar of ${mentionUser.displayName} :`).setImage(message.guild.members.cache.find(user => user.user.username === mentionUser.displayName).user.displayAvatarURL({format: 'png', size: 2048, dynamic: true})).setColor('#00ffff') ;
      message.channel.send(avatarYourSelfEmbedMessage) ;
    }
  }

//getInfosUser [mention]
  if (message.content.startsWith(`${BOT_PREFIX}getInfosUser`)) {
    if (mentionUser == undefined) {
      message.channel.send('Who do you want the information from?');
    } else {
      let infosUserEmbedMessage = new Discord.MessageEmbed().setColor(mentionUser.displayHexColor).setImage(mentionUser.user.displayAvatarURL({format : 'png', size : 256, dynamic : true})).setTitle(mentionUser.user.tag). setDescription(`Inscribed since ${mentionUser.user.createdAt}`).addField('Last message published:', mentionUser.lastMessage, true).addField('Activated:', mentionUser.user.presence, true).addField('Has been in the server since:', mentionUser.joinedAt, false);
      message.channel.send(infosUserEmbedMessage);
    }
  }
  
  //clean
  if (message.content.startsWith(`${BOT_PREFIX}clean`)) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      message.channel.send(notAuthorizedEmbedMessage);
    } else {
      if (args[1] === undefined) {
        let cleanSyntaxEmbedMessage = new Discord.MessageEmbed().setTitle('Clean Syntax').setColor('LIGHTGREEN'). setDescription("**Syntax** :\n`$clean [number of messages to be deleted in THIS channel]\n$clean [number of messages to be deleted in THIS channel] [User/Show Mention]``Example** :\n`$clean 26 @Nat76\nclean 12 #general`");
        message.channel.send(cleanSyntaxEmbedMessage);
      } else {
        message.delete();
            for (let i = 0; i < args[1];i++) {
              message.channel.lastMessage.delete({reason : `Cleaned for ${message.author.username}`});
          }
      }
    }
  }
  /*//cleanAll
  else if (message.content.startsWith(`${BOT_PREFIX}cleanAll`)) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      message.channel.send(notAuthorizedEmbedMessage);
    } else if (args[1] == undefined) {
      let cleanAllSyntaxEmbedMessage = new Discord.MessageEmbed().setTitle('CleanAll Syntax').setColor('LIGHTGREEN').setDescription('**Syntax** : \n`$cleanAll [User/channel/role mention]`\n**Example**: \n`$cleanAll @Nat76\n$cleanAll #general\n$cleanAll @Admin`');
      message.channel.send(cleanAllSyntaxEmbedMessage);
    } else {
      message.delete();
  
      if (args[1] == mentionUser) {
        for (let i = 0;message.mentions.members.first())
      }
    }
  }*/
  
  //getInfosServer
  if (message.content == `${BOT_PREFIX}getInfosServer`) {
    let infoserverEmbedMessage = new Discord.MessageEmbed().setColor('LIGHTGREEN').setTitle(message.guild.name).setDescription('Was created on ' + message.guild.createdAt + ` by **${message.guild.owner.user.tag}**`).setThumbnail(message.guild. iconURL()).addFields({name: 'Region', value: message.guild.region, inline: true}, {name: 'Number of members', value: message.guild.memberCount.toString(), inline: true}).setImage(message.guild.bannerURL({format: "png", size: 512}));
    message.channel.send(infosServerEmbedMessage);
  }
  
  //iduser[mention]
  if (message.content.startsWith(BOT_PREFIX + 'iduser')) {
    if (mentionUser == undefined) {
      message.channel.send('User not or wrongly mentioned');
    } else {
      console.log(message.author.username + ' used iduser command for ' + mentionUser.displayName + ' to : ' + message.createdAt);
      message.channel.send("The id of **" + mentionUser.displayName + "** is :__" + mentionUser.id + "__.");
    };
    };
    
    //idchannel [Mention]
    if (message.content.startsWith(BOT_PREFIX + 'idchannel')) {
      if (mentionChannel == undefined) {
        message.channel.send('Channel not or incorrectly mentioned');
      } else {
        console.log(message.author.username + 'asked for the ID of' + mentionChannel.name + 'at : ' + message.createdAt);
      message.channel.send("The id of **" + mentionChannel.name + "** is : __" + mentionChannel.id + '__ .');
    };
  };
  
  //suggestion [argument]
  if (message.content.startsWith(BOT_PREFIX + 'suggestion')) { 
    if (args == undefined) {
      message.reply("you didn't write down your suggestion, write it down with a space after suggestion and dashes between each word. Like this:\n" + BOT_PREFIX + "suggestion Here-my-suggestion.");
    } else {
      console.log(message.author.username + ' has a suggestion: ' + args + ' to : ' + message.createdAt);
      message.channel.send(SuccessEmbedMessage);
    };
  };
  
  //End utilities commands
  //Moderation commands
  
  //restart
  if (message.content == BOT_PREFIX + 'restart') {
    if (message.author.id !== '754229847206658160') {
      message.channel.send(notAuthorizedEmbedMessage);
    } else {
      message.channel.send('Restart...');
      console.log('Client restarted at ' + message.createdAt);
      client.destroy();
      client.login(BOT_TOKEN);
      message.delete();
      message.channel.send('Bot successfully restarted!');
    };
  };

//annoucement [channel] [message]
  if (message.content.startsWith(`${BOT_PREFIX}annoucement`)) {
    if (!message.member.hasPermission('MENTION_EVERYONE')) {
      message.channel.send(notAuthorizedEmbedMessage);
    } else if (args[1] == undefined) {
      let annoucementSyntaxEmbedMessage = new Discord.MessageEmbed().setColor('BLACK').setTitle('Annoucement');
    }
  }


//ban [user]
  if (message.content.startsWith(`${BOT_PREFIX}ban`)) {
    if(message.member.hasPermission('BAN_MEMBERS')) {
      if(mentionUser == undefined) {
        message.channel.send("Mention the user you want to ban.");
      } else if(args[2] == undefined){
        message.channel.send('Missing ban duration.');
      } else if (ars[3] == undefined) {
        message.channel.send('Missing reason.')
      } else if (mentionUser.banable) {
          mentionUser.ban({days : args[2], reason : args[3,4,5,6,7,8,9,10,11,12,13]}).then(user => {
            message.channel.send(`@${mentionUser.displayName} has been banned.`);
            message.delete();
            message.channel.lastMessage.delete({timeout : 5000});
            message.guild.channels.cache.find(ChannelName => ChannelName.name == 'general').send(`${mentionUser.displayName} played with fire, and got burned.`);
            user.createDM().then(channel => {
              channel.send('You have been banned from the server' + message.guild.name + ': ' + args[3,4,5,6,7,8,9,10,11,12,13] + 'You will be able to rejoin the server in ' + args[2] + ' days');
            });
          }).catch(err => {
            message.channel.send(':x: **Error**, ' + err);
            console.log(err);
          });
        } else {
          message.reply(`you can't ban ${mentionUser.displayName} !`);
        }
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }
  //kick
  else if (message.content.startsWith(`${BOT_PREFIX}kick`)) {
    if (message.member.hasPermission('KICK_MEMBERS')) {
      if (mentionUser == undefined) {
        message.channel.send("Mention the user you want to kick.");
      } else if(args[2] == undefined) {
        message.channel.send('Missing reason.');
      } else if (mentionUser.kickable) {
        mentionUser.kick(args[2,3,4,5,6,7,8,9,10,11,12]).then(user => {
          message.channel.send(`${mentionUser.displayName} has been excluded.`);
          message.delete();
          message.channel.lastMessage.delete({timeout : 5000});
          message.guild.channels.cache.find(ChannelName => ChannelName.name == 'general').send(`${mentionUser.displayName} leaned too far out the window and fell!`)
          user.createDM().then(channel => {
            channel.send(`You\'ve been banned from the server ${message.guild.name}: ${args[2,3,4,5,6,7,8,9,10,11,12]} You can come back anytime!`);
          });
        }).catch(err => {
          message.channel.send(':x: **Error**, ' + err);
        });
      } else {
        message.reply(`you can't ban ${mentionUser.displayName}`);
      }
    }
  }
  //mute
  else if (message.content.startsWith(`${BOT_PREFIX}mute`)) {
    if (message.member.hasPermission('MUTE_MEMBERS')) {
      if (mentionUser = undefined) {
        message.channel.send("Mention the user you want to mute.");
      } else /*if (!mentionUser.hasPermission('ADMINISTRATOR')) */{
          mentionUser.voice.setMute(true, `Muted by ${message.author.username}`);
          message.reply(`${mentionUser.displayName} to been muted.`);
      } 
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }
  //unmute
  else if (message.content.startsWith(`${BOT_PREFIX}unmute`)) {
    if (message.member.hasPermission('MUTE_MEMBERS')) {
      if (mentionUser == undefined) {
        message.channel.send("Mention the user you want to remove.");
      } else {
        mentionUser.voice.setMute(false, 'Unmuted');
      }
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }
  
  //End moderation commands
  
  /*//addnote [argument]
  if (message.content.startsWith(BOT_PREFIX + 'addnote')) {
    if(message.author.id !=='754229847206658160') {
      message.channel.send(notAuthorizedEmbedMessage);
    } else {
      if (args[1] == undefined) {
        message.channel.send('Add your note as an argument to your command.')
      } else {
        notes.push(args[1]);
        message.channel.send('Note added !');
      }
    }
  }/*readnote [argument]else if (message.content == BOT_PREFIX + 'readnote') {
    if(message.author.id !=='754229847206658160') {
      message.channel.send(notAuthorizedEmbedMessage);
    } else {
      if (args[1] == null) {
        message.reply('which?');
      } else {/*
        if (notes[parseFloat(args[1])] != undefined) {
        message.reply('The ' + args[1] + "e note does not exist!");
        } else {
          message.channel.send('This is:' + notes[parseFloat(args[1])]);
        /*}
       }
    }
  }/*clearnote
else if (message.content == BOT_PREFIX + 'clearnote') {
    if(message.author.id !== '754229847206658160') {
     message.channel.send(notAuthorizedEmbedMessage);
    } else {
      notes = [];
      message.channel.send('All notes have been deleted!');
    }
  }*/

//ping
  if (message.content == `${BOT_PREFIX}ping`) {
     if (!message.member.hasPermission('ADMINISTRATOR') || message.author.id !== '754229847206658160') {
      console.log(message.author.username + "tried to use the ping command at:" + message.createdAt);
      message.channel.send(notAuthorizedEmbedMessage);
    } else {
      const timeTaken = Date.now() - message.createdTimestamp;
      message.react('🏓');
      message.channel.send('pong !\n`' + timeTaken + 'ms`');
    }};
  
});
  

client.on('guildCreate', server => {
  let welcomeEmbedMessage = new Discord.MessageEmbed().setColor('LIGHTBLUE').setAuthor(server.owner.user.username, server.owner.user.displayAvatarURL).setTitle('**Thank you for adding Auxilium to' + server.name + '! ** :tada::tada::partying_face:').setDescription('Auxilium is a Discord bot that supports many features: moderation, fun, help with server management and some utility commands. \You can see the list of commands with the command `help`.The default prefix of Auxilium is `$` but you (||at least the admins||) can change the prefix at any time by using the command `setPrefix [your favorite prefix here].}. I\'ll be quiet now...').setFooter('For this bot, thanks to Discord.js, Heroku and GitHub !');
  server.systemChannel.send(welcomeEmbedMessage);
  server.systemChannel.createInvite({temporary : false, maxAge : 0, maxUses : 1, unique : true, reason : 'Verification for Nat76#3958'}).then(invite => {
    console.log(`Server joined ! Name: ${server.name}, number of members: ${server.memberCount}, invite: https://discord.gg/${invite.code} owner: ${server.owner.user.tag}.`);
  }).catch(err => {
server.owner.createDM().then(dm => dm.send('Error, I was unable to connect fully to the server, try again => https://discord.com/api/oauth2/authorize?client_id=864899752007827478&permissions=8&scope=bot'));
    server.leave();
    console.log('Server left: ' + err);
  });
});

/*
client.on('presenceUpdate', onlineMember => {
  if (onlineMember.status == 'online') {
    var min=1; 
    var max=5;  
    var random = Math.floor(Math.random() * (max - min)) + min; 
    onlineMember.user.createDM().then(dm => {
      switch (random) {
        case 1 :
          dm.send('Heyy, how's it going? :hugging:;');
          break;
        
        case 2 : 
           dm.send('Hey, where have you been ? we missed you :smile:');
          break;

        case 3 : 
           dm.send(`Eh <@${onlineMember.user.id}> ! A T-Rex attacked us while you were gone! :innocent:`);
          break;

        box 4 : 
           dm.send('So you're logging out without my permission? If you do that again you'll be banned from Discord for two weeks! :yum:');
          break
        default:
          console.error(`[FAILED TO SEND MESSAGE IN DM CHANNEL] I was unable to access ${onlineMember.user.tag}...`);
          break;
      };
    });
  } else return;

});
*/

