const Discord = require("discord.js");
const configuration = require('./package.json');
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
const ErrorEmbedMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription("Erreur lors de l'envoi du message.");
const SuccessEmbedMessage = new Discord.MessageEmbed().setColor('#008000').setDescription('Message envoyé avec succès !');


client.on('guildMemberAdd', member => {
member.roles.add('864898505470377984');
});

client.on('message', message => {
if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;
if (message.channel.type !== 'text' && message.author.id !== '754229847206658160') return;
let mentionUser = message.mentions.members.first();
let mentionChannel = message.mentions.channels.first();
let args = message.content.split(' ');
//var notes = [];
//let endMessage = args[0] + args[1];

// help
if (message.content == BOT_PREFIX + 'help') {
const helpEmbedMessage = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Help Commande').setAuthor('Add me to your server !', 'https://cdn.discordapp.com/avatars/864899752007827478/485367df72aa7e7241f97567aecb4f11.png?size=128', 'https://discord.com/api/oauth2/authorize?client_id=864899752007827478&permissions=8&scope=bot').setDescription("Voici toute les commandes actuellement disponible : \n**Utilitées**\niduser [Mention] : affiche l'identifiant de la personne mentionnée.\nidchannel [Mention] : affiche l'identifiant du salon mentionné.").addFields({ name :'Préfixe du bot :', value : BOT_PREFIX, inline : true }, { name : "Région d'hébergement du bot :", value:'Europe', inline :  true }).setTimestamp().setFooter('For the bot, thanks to Discord.js and Heroku.');
    client.channels.cache.get('864953618938986516').send('**' + message.author.username + '** a utilisé ' + message.content + ' dans __' + message.channel.name + '__.');
    message.author.createDM().then(channel => {
    channel.send(helpEmbedMessage);
     message.delete();
    console.log('Commande HELP utilisée par ' + message.author.username + ' à : ' + message.createdAt);
     }).catch(err => {
     message.channel.send("Échec de l'envoi du DM ou de la console d' éxécution : " + err);
     });
};

//avatar [argument]
if (message.content.startsWith(BOT_PREFIX + 'avatar')) {
  if (mentionUser == undefined) {
    var avatarMySelfEmbedMessage = new Discord.MessageEmbed().setTitle('Ton avatar :').setImage(message.author.displayAvatarURL({format: 'png', size: 1024, dynamic: true})).setColor('#00ffff');
    message.channel.send(avatarMySelfEmbedMessage);
  } else {
    var avatarYourSelfEmbedMessage = new Discord.MessageEmbed().setTitle(`L'avatar de ${mentionUser.displayName} :`).setImage(message.guild.members.cache.find(user => user.user.username === mentionUser.displayName).user.displayAvatarURL({format: 'png', size: 1024, dynamic: true})).setColor('#00ffff');
    message.channel.send(avatarYourSelfEmbedMessage);
  }
}

//restart
if (message.content == BOT_PREFIX + 'restart') {
  if (message.author.id !== '754229847206658160') {
    message.channel.send(notAuthorizedEmbedMessage);
  } else {
    message.channel.send('Redémarrage...');
    console.log('Client redémmaré à ' + message.createdAt);
    client.destroy();
    client.login(BOT_TOKEN);
    message.channel.send('Bot redémmaré avec succès !');
    };
};

//iduser [Mention]
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
   if (message.author.id !== '754229847206658160') {
    const notAuthorizedEmbedMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription('Tu ne peux pas utiliser cette commande <@' + message.author.id + '> !');
    console.log(message.author.username + " a essayé d'utiliser la commande ping à :" + message.createdAt);
    message.channel.send(notAuthorizedEmbedMessage);
  } else {
   const timeTaken = Date.now() - message.createdTimestamp;
   message.react('🏓');
   message.channel.send('pong !\n`' + timeTaken + 'ms`');
  }};

  });

client.on('error', err => {
  client.channels.cache.get('864953618938986516').send('**Erreur** : ' + err);
  console.log('Erreur, ' + err);
});
