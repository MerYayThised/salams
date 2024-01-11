const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const PREFIX = '/'; // Önek tanımlayın
const ALLOWED_ROLE_ID = '1185912164532363275'; // Yetkili rolün ID'sini tanımlayın

// Kullanıcı rollerini saklamak için basit bir nesne
const userRoles = {};

client.on('messageCreate', (message) => {
  // Botun kendi mesajlarına cevap verme
  if (message.author.bot) return;

  // Komutu kontrol et
  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    // Sadece belirli role sahip kullanıcılara izin ver
    if (command === 'ver' && hasAllowedRole(message.member)) {
      // Kullanıcıdan alınan parametreleri kontrol et
      const username = args[0];
      const period = args[1];
      const role = args[2];

      if (!username || !period || !role) {
        message.reply('Lütfen tüm parametreleri doğru bir şekilde girin.');
        return;
      }

      // Belirtilen rolü ver
      userRoles[username] = role;

      message.reply(`${username} kullanıcısına ${period} süresiyle ${role} rolü verildi.`);
    }
  }
});

// Kullanıcının belirli bir role sahip olup olmadığını kontrol et
function hasAllowedRole(member) {
  return member.roles.cache.has(ALLOWED_ROLE_ID);
}

// Botu başlat
client.login('MTE5NTA4MzY2MDM0MTMwMTM0OQ.GocIu6.vNNf2DD2zEAQ0c55ZUndLgzvAncbM2GRc_6Bjo');
