const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const configuration = require('./package.json');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

const BOT_DISCRIMINATOR = process.env.BOT_DISCRIMINATOR;
const BOT_NAME = process.env.BOT_NAME;
const BOT_ID = process.env.BOT_ID;
const BOT_MENTION = '<@' + BOT_ID + '>';
const BOT_PREFIX = process.env.BOT_PREFIX;
const ErrorEmbedMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription("Erreur lors de l'envoi du message.");
const SuccessEmbedMessage = new Discord.MessageEmbed().setColor('#008000').setDescription('Message envoyé avec succès !');


client.on('ready', () => {
  console.log(BOT_NAME + ` est opérationnel !`);
  client.channels.cache.get('864953618938986516').send( '**' + BOT_NAME + '** est opérationnel !');
  client.user.setActivity(' Need help ? | ' + BOT_PREFIX + 'help', {type: 'PLAYING'});
}); 

client.on('guildMemberAdd', member => {
member.roles.add('864898505470377984');
});

client.on('message', message => {
if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;
if (message.channel.type !== 'text' && message.author.id !== '754229847206658160') return;
let mentionUser = message.mentions.members.first();
let mentionChannel = message.mentions.channels.first();
let args = message.content.split(' ');
var list = [];

function playMusic(connection) {
  let dispatcher = connection.play(ytdl(list[0], {quality: 'highestaudio'}));

  dispatcher.on('finish', () => {
   list.shift();
   dispatcher.destroy();

   if (list.length > 0) {
     playMusic(connection);
   } else {
     connection.disconnect();   
    }
  });
  dispatcher.on('error', err => {
    console.log('Erreur du dispatcher : ' + err);
    client.guilds.channel.cache.get('864850399813828648').send('Erreur du dispatcher : ' + err);
    dispatcher.destroy();
    connection.disconnect();
  });
}

// help
if (message.content == BOT_PREFIX + 'help') {
const helpEmbedMessage = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Help Commande').setAuthor(message.author.username, message.author.displayAvatarURL()).setDescription("Voici toute les commandes actuellement disponible :\n**Musique**\nPlay [Lien YouTube]: Rejoint un salon vocal et lance la vidéo du lien inscrit." +/*\nPause : Met en pause la vidéo.*/ "\n**Utilitées**\niduser [Mention] : affiche l'identifiant de la personne mentionnée.\nidchannel [Mention] : affiche l'identifiant du salon mentionné.").addFields({ name :'Préfixe du bot :', value : BOT_PREFIX, inline : true }, { name : "Région d'hébergement du bot :", value:'Europe', inline :  true }).setTimestamp().setFooter('For the bot, thanks to Discord.js and Heroku.');
    client.channels.cache.get('864953618938986516').send('**' + message.author.username + '** a utilisé ' + message.content + ' dans __' + message.channel.name + '__.');
    message.author.createDM().then(channel => {
    channel.send(helpEmbedMessage);
    console.log('Commande HELP utilisée par ' + message.author.username + ' à : ' + message.createdAt);
     }).catch(err => {
     message.channel.send("Échec de l'envoi du DM ou de la console d' éxécution : " + err);
     });
};

//restart
if (message.content == BOT_PREFIX + 'restart') {
  if (message.author.id !== '754229847206658160') {
    message.channel.send(notAuthorizedEmbedMessage);
  } else {
    message.channel.send('Redémarrage...');
    console.log('Client éteint à ' + message.createdAt);
    client.destroy();
    client.login(process.env.BOT_TOKEN);
    message.channel.send('Bot redémmaré avec succès !');
    client.user.setActivity(' Need help ? | ' + BOT_PREFIX + 'help', {type: 'PLAYING'});
  }
}

//iduser [Mention]
if (message.content.startsWith(BOT_PREFIX + 'iduser')) {
if (mentionUser == undefined) {
  message.channel.send('Utilisateur non ou mal mentionné');
    } else {
    console.log(message.author.username + ' a utilisé la commande iduser pour ' + mentionUser.displayName + ' à : ' + message.createdAt);
    message.channel.send("L'id de **" + mentionUser.displayName + "** est :__" + mentionUser.id + "__.");
    }
    };

//idchannel [Mention]
if (message.content.startsWith(BOT_PREFIX + 'idchannel')) {
  if (mentionChannel == undefined) {
    message.channel.send('Salon non ou mal mentionné');
  } else {
    console.log(message.author.username + " a demandé l'ID de " + mentionChannel.name + ' à : ' + message.createdAt);
    message.channel.send("L'id de **" + mentionChannel.name + "** est : __" + mentionChannel.id + '__ .');
  };
}

//suggestion [argument]
if (message.content.startsWith(BOT_PREFIX + 'suggestion')) {
  if (args == undefined) {
    message.reply("tu n'as pas noté ta suggestion, note la avec un espace après suggestion et des tirets en chaque mot. Comme ceci :\n\n" + BOT_PREFIX + "suggestion Voici-ma-suggestion.");
  } else {
     console.log(message.author.username + 'a une suggestion : ' + args[1] + ' à : ' + message.createdAt);
     message.channel.send(SuccessEmbedMessage);
  };
}
  
//play [argument]
  if (message.content.startsWith(BOT_PREFIX + 'play')) {
    if (message.member.voice.channel) {
      if (args[1] == undefined || !args[1].startsWith('https://www.youtube.com/watch?')) {
        message.reply("tu n'as pas ou tu as mal saisi le lien YouTube.");
      } else {
        if (list.length > 0) {
          list.push(args[1]);
          message.reply("t'a vidéo à été ajouté à la liste !");
        } else {
          list.push(args[1]);
          message.reply("t'a vidéo à été ajouté à la liste !");
          message.member.voice.channel.join().then(connection => {
          playMusic(connection);  

          connection.on('disconnect', () => {
            list = [];
          });
          }).catch(err => {
          message.reply("je n'ai pas pu me connecter : " + err);
          });
        }
      };
      };
  };

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
