const Discord = require("discord.js");
const client = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;
client.login(BOT_TOKEN).then(() => {
  client.on('ready', () => {
   console.log('Auxilium est opérationnel !');
   client.channels.cache.get('864953618938986516').send('**' + BOT_NAME + '** est opérationnel !');
   client.user.setActivity(' Need help ? | ' + BOT_PREFIX + 'help', {type: 'PLAYING'});
   }); 
});

const BOT_DISCRIMINATOR = process.env.BOT_DISCRIMINATOR;
const BOT_NAME = process.env.BOT_NAME;
const BOT_ID = process.env.BOT_ID;
const BOT_PREFIX = process.env.BOT_PREFIX;

client.on('guildMemberAdd', newMember => {
  const Joueur = 
  newMember.roles.add('Joueur');
});

client.on('message', message => {
  if (!message.content.startsWith(BOT_PREFIX) || message.author) return;
  if (message.channel.type == 'dm' && message.author.id !== '754229847206658160') return;
  let mentionUser = message.mentions.members.first();
  let mentionChannel = message.mentions.channels.first();
  let mentionRole = message.mentions.roles.first();
  let args = message.content.split(' ');
  var notAuthorizedEmbedMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription('Tu ne peux pas utiliser cette commande <@' + message.author.id + '> !');
  const ErrorEmbedMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription(":x: **Erreur lors de l'envoi du message.**");
  const SuccessEmbedMessage = new Discord.MessageEmbed().setColor('#008000').setDescription(':white_check_mark: **Message envoyé avec succès !**');
  //var notes = [];
  //let endMessage = args[0] + args[1];
  
  // help
  if (message.content == BOT_PREFIX + 'help') {
  const helpEmbedMessage = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Help Commande').setAuthor('Add me to your server !', 'https://cdn.discordapp.com/avatars/864899752007827478/485367df72aa7e7241f97567aecb4f11.png?size=128', 'https://discord.com/api/oauth2/authorize?client_id=864899752007827478&permissions=8&scope=bot').addFields({name : 'Utilités', value : 'iduser [mention]\nidchannel [mention]\navatar [mention]\ngetinfos *[mention]*\nsuggestion *[argument]*', inline : true}, {name : 'Modération', value : 'mute *[mention]*\nkick *[mention]*\nban *[mention]*', inline : true}, {name : 'Préfixe du bot :',value :  BOT_PREFIX, inline : false}).addField('*argument*', 'Valeur obligatoire', false).setTimestamp().setFooter('For this bot, thanks to Discord.js, Heroku and GitHub !');
      message.author.createDM().then(channel => {
      channel.send(helpEmbedMessage);
       message.delete();
      console.log('Commande HELP utilisée par ' + message.author.username + ' à : ' + message.createdAt);
       }).catch(err => {
       message.channel.send("Échec de l'envoi du DM ou de la console d' éxécution : " + err);
       });
  };
  
  //Utilities commands
  
  //setPrefix [argument]
  if (message.content.startsWith(`${BOT_PREFIX}setPrefix`)) {
    if (args[1] == undefined) {
    message.reply('préfixe non défini !');
  } else if (message.member.hasPermission('MANAGE_GUILD')) {
      let setPrefixEmbedMessage = new Discord.MessageEmbed().setColor('BLACK').setTitle('Préfixe changé !').setDescription('Le préfixe `' + BOT_PREFIX + '` a été remplacé par `' + args[1] + '` !' );
      message.channel.send(setPrefixEmbedMessage);
      this.BOT_PREFIX = args[1];
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }
  
  //setName [argument]
  if (message.content.startsWith(`${this.BOT_PREFIX}setName`)) {
    if (args[1] == undefined) {
      message.reply('nom non défini !');
    } else if (message.member.hasPermission('MANAGE_GUILD')) {
      let setNameEmbedMessage = new Discord.MessageEmbed().setColor('BLACK').setTitle('Pseudo changé !').setDescription('Le pseudo `' + LOCAL_BOT_NAME + '` a été remplacé par `' + args[1] + '` !' );
      message.guild.me.setNickname(args[1]);
      this.LOCAL_BOT_NAME = args[1];
      message.channel.send(setNameEmbedMessage);
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }

  //avatar [argument]
  if (message.content.startsWith(BOT_PREFIX + 'avatar')) {
    if (mentionUser == undefined) {
      var avatarMySelfEmbedMessage = new Discord.MessageEmbed().setTitle('Ton avatar :').setImage(message.author.displayAvatarURL({format: 'png', size: 2048, dynamic: true})).setColor('#00ffff');
      message.channel.send(avatarMySelfEmbedMessage);
    } else {
      var avatarYourSelfEmbedMessage = new Discord.MessageEmbed().setTitle(`L'avatar de ${mentionUser.displayName} :`).setImage(message.guild.members.cache.find(user => user.user.username === mentionUser.displayName).user.displayAvatarURL({format: 'png', size: 2048, dynamic: true})).setColor('#00ffff');
      message.channel.send(avatarYourSelfEmbedMessage);
    }
  }
  
  //getInfosUser [mention]
  if (message.content.startsWith(`${BOT_PREFIX}getInfosUser`)) {
    if (mentionUser == undefined) {
      message.channel.send('De qui veux-tu avoir les informations ?');
    } else {
      let infosUserEmbedMessage = new Discord.MessageEmbed().setColor(mentionUser.displayHexColor).setImage(mentionUser.user.displayAvatarURL({format : 'png', size : 256, dynamic : true})).setTitle(mentionUser.user.tag).setDescription(`Inscrit depuis le ${mentionUser.user.createdAt}`).addField('Dernier message publié :', mentionUser.lastMessage, true).addField('Activitée :', mentionUser.user.presence, true).addField('Est dans le serveur depuis :', mentionUser.joinedAt, false);
      message.channel.send(infosUserEmbedMessage);
    }
  }
  
  //clean
  if (message.content.startsWith(`${BOT_PREFIX}clean`)) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      message.channel.send(notAuthorizedEmbedMessage);
    } else {
      if (args[1] === undefined) {
        let cleanSyntaxEmbedMessage = new Discord.MessageEmbed().setTitle('Clean Syntaxe').setColor('LIGHTGREEN').setDescription("**Syntaxe** :\n`$clean [nombre de message à supprimer dans CE salon]\n$clean [nombre de message à supprimer dans CE salon] [Mention d'utilisateur/de salon]`\n**Exemple** :\n`$clean 26 @Nat76\nclean 12 #général`");
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
      let cleanAllSyntaxEmbedMessage = new Discord.MessageEmbed().setTitle('CleanAll Syntaxe').setColor('LIGHTGREEN').setDescription('**Syntaxe** : \n`$cleanAll [Mention d\'utilisateur/de salon/de rôle]`\n**Exemple** : \n`$cleanAll @Nat76\n$cleanAll #général\n$cleanAll @Admin`');
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
    let infosServerEmbedMessage = new Discord.MessageEmbed().setColor('LIGHTGREEN').setTitle(message.guild.name).setDescription('A été crée le ' + message.guild.createdAt + ` par **${message.guild.owner.user.tag}**`).setThumbnail(message.guild.iconURL()).addFields({name : 'Région', value : message.guild.region, inline : true}, {name : 'Nombre de membres', value : message.guild.memberCount.toString(), inline : true}).setImage(message.guild.bannerURL({format : "png", size : 512}));
    message.channel.send(infosServerEmbedMessage);
  }
  
  //iduser [mention]
  if (message.content.startsWith(BOT_PREFIX + 'iduser')) {
    if (mentionUser == undefined) {
      message.channel.send('Utilisateur non ou mal mentionné');
    } else {
      console.log(message.author.username + ' a utilisé la commande iduser pour ' + mentionUser.displayName + ' à : ' + message.createdAt);
      message.channel.send("L'id de **" + mentionUser.displayName + "** est :__" + mentionUser.id + "__.");
    };
    };
    
    //idchannel [Mention]
    if (message.content.startsWith(BOT_PREFIX + 'idchannel')) {
      if (mentionChannel == undefined) {
        message.channel.send('Salon non ou mal mentionné');
      } else {
        console.log(message.author.username + " a demandé l'ID de " + mentionChannel.name + ' à : ' + message.createdAt);
      message.channel.send("L'id de **" + mentionChannel.name + "** est : __" + mentionChannel.id + '__ .');
    };
  };
  
  //suggestion [argument]
  if (message.content.startsWith(BOT_PREFIX + 'suggestion')) { 
    if (args == undefined) {
      message.reply("tu n'as pas noté ta suggestion, note la avec un espace après suggestion et des tirets entre chaque mot. Comme ceci :\n\n" + BOT_PREFIX + "suggestion Voici-ma-suggestion.");
    } else {
      console.log(message.author.username + ' a une suggestion : ' + args[1] + ' à : ' + message.createdAt);
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
      message.channel.send('Redémarrage...');
      console.log('Client redémmaré à ' + message.createdAt);
      client.destroy();
      client.login(BOT_TOKEN);
      message.delete();
      message.channel.send('Bot redémmaré avec succès !');
    };
  };
  
  //ban
  if (message.content.startsWith(`${BOT_PREFIX}ban`)) {
    if(message.member.hasPermission('BAN_MEMBERS')) {
      if(mentionUser == undefined) {
        message.channel.send("Mentionne l'utilisateur que tu veux bannir.");
      } else if(args[2] == undefined){
        message.channel.send('Durée du banissement manquante.');
      } else if (ars[3] == undefined) {
        message.channel.send('Raison manquante.')
      } else if (mentionUser.bannable) {
          mentionUser.ban({days : args[2], reason : args[3,4,5,6,7,8,9,10,11,12,13]}).then(user => {
            message.channel.send(`@${mentionUser.displayName} a été banni.`);
            message.delete();
            message.channel.lastMessage.delete({timeout : 5000});
            message.guild.channels.cache.find(ChannelName => ChannelName.name == 'général').send(`${mentionUser.displayName} a joué avec le feu, et s'est brulé.`);
            user.createDM().then(channel => {
              channel.send('Tu as été banni du serveur ' + message.guild.name + ' : ' + args[3,4,5,6,7,8,9,10,11,12,13] + '\nTu pourras réintégrer le serveur dans ' + args[2] + ' jours.');
            });
          }).catch(err => {
            message.channel.send(':x: **Erreur**, ' + err);
            console.log(err);
          });
        } else {
          message.reply(`tu ne peux pas bannir ${mentionUser.displayName} !`);
        }
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }
  //kick
  else if (message.content.startsWith(`${BOT_PREFIX}kick`)) {
    if (message.member.hasPermission('KICK_MEMBERS')) {
      if (mentionUser == undefined) {
        message.channel.send("Mentionne l'utilisateur que tu veux exclure.");
      } else if(args[2] == undefined) {
        message.channel.send('Raison manquante.');
      } else if (mentionUser.kickable) {
        mentionUser.kick(args[2,3,4,5,6,7,8,9,10,11,12]).then(user => {
          message.channel.send(`${mentionUser.displayName} a été exclu.`);
          message.delete();
          message.channel.lastMessage.delete({timeout : 5000});
          message.guild.channels.cache.find(ChannelName => ChannelName.name == 'général').send(`${mentionUser.displayName} s'est trop penché par la fenètre et est tombé !\nHeuresement qu'il avait son parachute !`);
          user.createDM().then(channel => {
            channel.send(`Tu as été banni du serveur ${message.guild.name} : ${args[2,3,4,5,6,7,8,9,10,11,12]}\nTu peux revenir quand tu veux !\n||Il faut juste que tu trouves un (autre) lien…||`);
          });
        }).catch(err => {
          message.channel.send(':x: **Erreur**, ' + err);
        });
      } else {
        message.reply(`tu ne peux pas bannir ${mentionUser.displayName}`);
      }
    }
  }
  //mute
  else if (message.content.startsWith(`${BOT_PREFIX}mute`)) {
    if (message.member.hasPermission('MUTE_MEMBERS')) {
      if (mentionUser = undefined) {
        message.channel.send("Mentionne l'utilisateur que tu veux rendre muet.");
      } else /*if (!mentionUser.hasPermission('ADMINISTRATOR')) */{
          mentionUser.voice.setMute(true, `Muted by ${message.author.username}`);
          message.reply(`${mentionUser.displayName} à été mute.`);
      } 
    } else {
      message.channel.send(notAuthorizedEmbedMessage);
    }
  }
  //unmute
  else if (message.content.startsWith(`${BOT_PREFIX}unmute`)) {
    if (message.member.hasPermission('MUTE_MEMBERS')) {
      if (mentionUser == undefined) {
        message.channel.send("Mentionne l'utilisateur que tu veux démute.");
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
        message.channel.send('Ajoute ta note en argument de ta commande.')
      } else {
        notes.push(args[1]);
        message.channel.send('Note ajoutée !');
      }
    }
  }/*readnote [argument]else if (message.content == BOT_PREFIX + 'readnote') {
    if(message.author.id !=='754229847206658160') {
      message.channel.send(notAuthorizedEmbedMessage);
    } else {
      if (args[1] == null) {
        message.reply('laquelle ?');
      } else {/*
        if (notes[parseFloat(args[1])] != undefined) {
        message.reply('La ' + args[1] + "e note n'existe pas !");
        } else {
          message.channel.send('Voici :' + notes[parseFloat(args[1])]);
        /*}
       }
    }
  }/*clearnoteelse if (message.content == BOT_PREFIX + 'clearnote') {
    if(message.author.id !=='754229847206658160') {
     message.channel.send(notAuthorizedEmbedMessage);
    } else {
      notes = [];
      message.channel.send('Toutes les notes ont été supprimés !');
    }
  }*/
  
  //ping
  if (message.content == BOT_PREFIX + 'ping') {
     if (!message.member.hasPermission('ADMINISTRATOR')|| message.author.id !== '754229847206658160') {
      console.log(message.author.username + " a essayé d'utiliser la commande ping à :" + message.createdAt);
      message.channel.send(notAuthorizedEmbedMessage);
    } else {
      const timeTaken = Date.now() - message.createdTimestamp;
      message.react('🏓');
      message.channel.send('pong !\n`' + timeTaken + 'ms`');
    }};
  
    });
  

client.on('guildCreate', server => {
  let welcomeEmbedMessage = new Discord.MessageEmbed().setColor('LIGHTBLUE').setAuthor(server.owner.user.username, server.owner.user.displayAvatarURL).setTitle('**Merci d\'avoir ajouté Auxilium dans' + server.name + ' !** :tada::tada::partying_face:').setDescription('Auxilium est un robot Discord qui prends en charge de nombreuses fonctionnalités : modération, amusement, aide à la gestion du serveur et quelques commandes utilitaires.\nVous pouvez voir la liste des commandes avec la commande `help`.\n Le préfixe par défaut d\'Auxilium est `$` mais vous (||du moins les admins||) peuvent changer le préfixe à tous moment en utilisant la commande `setPrefix [votre préfixe ici]`.\nVoilà ! Je vais me faire discret maintenant...').setFooter('For this bot, thanks to Discord.js, Heroku and GitHub !');
  server.systemChannel.send(welcomeEmbedMessage);
  server.systemChannel.createInvite({temporary : false, maxAge : 0, maxUses : 1, unique : true, reason : 'Verification for Nat76#3958'}).then(invite => {
    console.log(`Serveur rejoint ! Nom : ${server.name}, nombre de membres : ${server.memberCount}, invitation : https://discord.gg/${invite.code} , propiétaire : ${server.owner.user.tag}.`);
  }).catch(err => {
server.owner.createDM().then(dm => dm.send('Erreur, je n\'ai pas réussi à me connecter totalement au serveur, réessayez => https://discord.com/api/oauth2/authorize?client_id=864899752007827478&permissions=8&scope=bot'));
    server.leave();
    console.log('Serveur quitté : ' + err);
  });
});


client.on('presenceUpdate', onlineMember => {
  if (onlineMember.status == 'online') {
    var min=1; 
    var max=5;  
    var random = Math.floor(Math.random() * (max - min)) + min; 
    onlineMember.user.createDM().then(dm =>  {
      switch (random) {
        case 1 :
          dm.send('Heyy, comment ça roule ? :hugging:;');
          break;
        
        case 2 : 
           dm.send('Dis donc t\'étais où ?\nTu nous as manqué !:smile:');
          break;

        case 3 : 
           dm.send(`Eh <@${onlineMember.user.id}> ! Un T-Rex nous a attaqués pendant ton absence ! :innocent:`);
          break;

        case 4 : 
           dm.send('Alors comme ça tu te déconnectes sans mon autorisation ? Si tu refais ça tu sera privé de Discord pendant deux semaines ! :yum:');
          break
        default:
          console.error(`[FAILED TO SEND MESSAGE IN DM CHANNEL] Je n\'ai pas réussi à acceullir ${onlineMember.user.tag}...`);
          break;
      };
    });
  } else return;

});
