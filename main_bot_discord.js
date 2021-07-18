const Discord = require("discord.js");
const client = new Discord.Client();

const BOT_DISCRIMINATOR = process.env.BOT_DISCRIMINATOR;
const BOT_NAME = process.env.BOT_NAME;
const BOT_ID = process.env.BOT_ID;
const BOT_MENTION = '<@' + BOT_ID + '>';
const BOT_PREFIX = process.env.BOT_PREFIX;
const ErrorEmbedMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription("Erreur lors de l'envoi du message.");


client.on('ready', () => {
  console.log(BOT_NAME + ` est opérationnel !`);
  client.channels.cache.get('864953618938986516').send( '**' + BOT_NAME + '** est opérationnel !');
}); 

client.on('guildMemberAdd', member => {
member.roles.add('864898505470377984');
});

client.on('message', message => {
if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;
if (message.channel.type !== 'text' && message.author.id !== '754229847206658160') return;
let mention = message.mentions.members.first();

// help
if (message.content == BOT_PREFIX + 'help') {
const helpEmbedMessage = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Help Commande').setAuthor(message.author.username, message.author.displayAvatarURL()).setDescription("Voici toute les commandes actuellement disponible :\niduser : affiche ton identifiant;\nidchannel : affiche l'identifiant du salon;").addField('Préfixe du bot :', BOT_PREFIX, true).setTimestamp().setFooter('For the bot, thanks to Discord.js.');
    client.channels.cache.get('864953618938986516').send('**' + message.author.username + '** a utilisé ' + message.content + ' dans __' + message.channel.name + '__.');
    message.author.createDM().then(channel => {
    channel.send(helpEmbedMessage);
    console.log('Commande HELP utilisée');
     }).catch(err => {
     message.channel.send("Échec de l'envoi du DM ou de la console d' éxécution : " + err);
     });
}

//iduser
if (message.content.startsWith(BOT_PREFIX + 'iduser')) {
if (mention == undefined) {
   client.channels.cache.get('864953618938986516').send('**' + message.author.username + '** a utilisé ' + message.content + ' dans __' + message.channel.name + '__.');
    message.channel.send('Votre id est __' + message.author.id + '__, **' + message.author.username + '**.'); } else {
    client.channels.cache.get('864953618938986516').send('**' + message.author.username + '** a utilisé ' + message.content + ' dans __' + message.channel.name + '__.');
    message.channel.send("L'id de " + mention.displayName + " est :__" + mention.id + "__.");
    }
    };

//idchannel
if (message.content.startsWith(BOT_PREFIX + 'idchannel')) {
client.channels.cache.get('864953618938986516').send('**' + message.author.username + '** a utilisé ' + message.content + ' dans __' + message.channel.name + '__.');
    message.channel.send('**'+ message.author.username+'**'+', '+"l'id de ce salon est __"+ message.channel.id +'__.');
}

//ping
if (message.content == BOT_PREFIX + 'ping') {
   if (message.author.id !== '754229847206658160') {const notAuthorizedEmbededMessage = new Discord.MessageEmbed().setColor('#FF0000').setDescription('Tu ne peux pas utiliser cette commande <@' + message.author.id + '> !');
   console.log(message.author.username + "a essayé d'utiliser la commande ping.");
   message.channel.send(notAuthorizedEmbededMessage);} else {
   message.react('🏓');
   message.channel.send('pong !');
  }};

  });
client.login(process.env.BOT_TOKEN);
