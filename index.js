const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const configuration = [require('./package_test.json'), require('./.vscode/launch _test.json')];
const client = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;
client.login(BOT_TOKEN).then(() => {
  client.on('ready', () => {
   console.log('Auxilium est opérationnel !');
   client.channels.cache.get('864953618938986516').send('**' + BOT_NAME + '** est opérationnel !\nLien :\nhttps://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=video&cd=&cad=rja&uact=8&ved=2ahUKEwjb_sLGvfLxAhXE3oUKHQq1DB0QtwIwAXoECAUQAw&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D7wtfhZwyrcc&usg=AOvVaw3U-65bSLgRudWYu3blLxwp\nhttps://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=video&cd=&cad=rja&uact=8&ved=2ahUKEwip8abqvfLxAhWkyoUKHWMUCmcQtwIwAnoECAkQAw&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DALZHF5UqnU4&usg=AOvVaw15pEH_fhmGisjqT-M4SxJg\nhttps://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjSlqvDvfLxAhXU3oUKHYAJB24QyCkwAHoECAIQAw&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLDU_Txk06tM&usg=AOvVaw3TOk4o_GkDuODqTByNP2WP');
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
var list = [];

function playMusic(connection) {
  let dispatcher = connection.play(ytdl(list[0], {quality: 'highestaudio'}));
  message.channel.send(':arrow_forward:**Joue ' + list[0] + '**.');

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
     message.delete();
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
            message.channel.send(':white_check_mark: **Salon rejoint avec succès !**');
            playMusic(connection);  
            connection.on('disconnect', () => {
            list = [];
          });
          });
        };
      };
      } else {
        return message.channel.send("Connecte-toi d'abord à un salon vocal avant d'utiliser cette commande !");
      };
  };

/*// leave
if (message.content == BOT_PREFIX + 'leave') {
  if (client.user.voice.channel) {
    Discord.VoiceState.disconnect();
  } else {
    message.react('❓');
  }
}*/
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