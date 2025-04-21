const axios = require('axios');
const { cmd } = require('../command');
const { getBuffer } = require('../lib/functions');

cmd({
  pattern: 'ss',
  alias: ['ssw'],
  react: '🛠️',
  desc: 'Download screenshot of a given link.',
  category: 'other',
  use: '.ss <link>',
  filename: __filename,
},
async (client, message, input, { from: chatId, q: query, reply }) => {
  if (!query) {
    return reply('කරුණාකර screenshot එක ගන්න URL එකක් ලබා දෙන්න.');
  }

  try {
    const apiUrl = `https://api.giftedtech.web.id/api/tools/ssweb?apikey=gifted&url=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    const messageOptions = {
      image: imageBuffer,
      caption: '*SCREENSHOTE DOWNLOADER*\n\n\n> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ramesh ᶜᵒᵈᵉʳ',
      contextInfo: {
        mentionedJid: [message.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363349375266377@newsletter',
          newsletterName: '㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ',
          serverMessageId: 143,
        },
      },
    };

    await client.sendMessage(chatId, messageOptions, { quoted: message });
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    await reply('Screenshot එක ගන්න බැරි වුණා. කරුණාකර නැවත උත්සාහ කරන්න.');
  }
});