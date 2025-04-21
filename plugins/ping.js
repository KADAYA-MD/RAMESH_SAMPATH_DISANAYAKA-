const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed","pong"],use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const startTime = Date.now();

        // Add a short delay
        await new Promise(resolve => setTimeout(resolve, 10)); // 10ms delay

        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the ping result
        await conn.sendMessage(from, { 
            text: `*𝐤𝐚𝐝𝐚𝐲𝐚 𝐦𝐝 SPEED: ${ping}ms*`, 
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363349375266377@newsletter',
                    newsletterName: '❮❮ 𝑻 𝑯 𝑬 - 𝑫 么 𝑹 𝑲 -𝑲𝑰𝑳𝑳𝑬𝑹 ❯❯',
                    serverMessageId: 143
                }
            },
  externalAdReply: {
            title: "🩸⃟༑⌁𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃梨🐉",
            body: "⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : 𝐊𝐀𝐃𝐀𝐘𝐀 🐉",
            thumbnailUrl: "https://raw.githubusercontent.com/LAKSIDUOFFICIAL/LAKSIDU-BOT/refs/heads/main/Screenshot_20250208-114759_Photo%20Editor.jpg", // Use the URL directly here
            sourceUrl: "https://github.com/laksidunimsara1/QUEEN-HASHI-MD",
            mediaType: 1,
            renderLargerThumbnail: true
        }
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

// ping2 

cmd({
    pattern: "ping2",
    desc: "Check bot's response time.",
    category: "main",
    react: "🍂",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*PINGING...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*SPEED : ${ping}ms*` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
