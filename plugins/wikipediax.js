const config = require('../config');
const { cmd, commands } = require('../command');
const wiki = require('wikipedia');
const { readEnv } = require('../lib/database');

// Define the Wikipedia search command
cmd({
    pattern: "wiki",
    desc: "Search Wikipedia for information",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Config එකෙන් LANGUAGE කියවනවා
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        // භාෂාව අනුව පණිවිඩ
        const messages = {
            sinhala: {
                noQuery: 'කරුණාකර සෙවුම් විමසුමක් ලබා දෙන්න.',
                replyText: (q, summary) => `
*📚 KADAYA විකිපීඩියා 📚*

> 🔍 *විමසුම*: _${q}_

> 💬 *මාතෘකාව*: _${summary.title}_

> 📝 *සාරාංශය*: _${summary.extract}_

> 🔗 *URL*: ${summary.content_urls.desktop.page}

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʀᴀᴍᴇꜱʜ ᶜᵒᵈᵉʳ`,
                error: (e) => `දෝෂයක් ඇති වුණා: ${e.message}`
            },
            english: {
                noQuery: 'Please provide a search query.',
                replyText: (q, summary) => `
*📚 𝐊𝐀𝐃𝐀𝐘𝐀 𝐖𝐈𝐊𝐈𝐏𝐄𝐃𝐈𝐀 📚*

> 🔍 *Query*: _${q}_

> 💬 *Title*: _${summary.title}_

> 📝 *Summary*: _${summary.extract}_

> 🔗 *URL*: ${summary.content_urls.desktop.page}

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`,
                error: (e) => `Error: ${e.message}`
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

        // Check if a query was provided
        if (!q) {
            return reply(msg.noQuery);
        }

        // Fetch summary from Wikipedia
        const summary = await wiki.summary(q);
        
        // Send the reply with the thumbnail image
        await conn.sendMessage(from, { 
            image: { url: summary.originalimage.source }, 
            caption: msg.replyText(q, summary) 
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error(e));
    }
});
