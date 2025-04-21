const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "support",
    alias: ["help", "team"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📑",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
      const status = `╭━━〔${new Date().getHours() < 12 ? '*🌄 සුබ උදෑසනක් 🌄*' : '*🌛 සුබ රාත්‍රියක්  🌛*'}〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *🤠 𝐎𝐰𝐧𝐞𝐫: 𝐊𝐀𝐃𝐀𝐘𝐀🐉*
┃◈┃• *🪪 𝐕𝐞𝐫𝐬𝐢𝐨𝐧*:  𝟐.𝟎*
┃◈└───────────┈⊷
╰──────────────┈
*┏━━━━━━━━━━━━━━━━━━━━━*
*┃🐉 TEAM :  ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ Y2x_4! ᶜᵒᵈᵉʳ
*┃🐉 OWNER: 𝐑𝐀𝐌𝐄𝐒𝐇_𝐒𝐀𝐌𝐏𝐀𝐓𝐇🐉*
*┃🐉 NUMBER: +94766002356*
*┃🐉 HELPER: 𝐇𝐀𝐒𝐇𝐈-𝐌𝐃*
*┃🐉 NUMBER: +94766002356*
*┃🐉 HELP WEB: https://queen-hashi-web.vercel.app/qr* 
*┗━━━━━━━━━━━━━━━━━━━━━*
╭━━〔 *𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃📑 𝐁𝐎𝐓 𝐑𝐄𝐏𝐎 : 𝐥𝐨𝐚𝐝𝐢𝐧𝐠😹🖕
┃◈┃
┃◈┃📑 𝐁𝐎𝐓 𝐖𝐄𝐁 : 𝐥𝐨𝐚𝐝𝐢𝐧𝐠😹🖕
┃◈┃
┃◈┃📑 𝐁𝐎𝐓 𝐂𝐇𝐀𝐍𝐄𝐋 : 𝐥𝐨𝐚𝐝𝐢𝐧𝐠😹🖕
┃◈┃
┃◈┃📑 𝐎𝐖𝐍𝐄𝐑 𝐍𝐔𝐌 : +94766002356
┃◈└───────────┈⊷
╰──────────────┈⊷
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ 𝐤𝐚𝐝𝐚𝐲𝐚 ᶜᵒᵈᵉʳ
`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: "https://i.ibb.co/M5p9dt2d/6514c455419b2a6c.jpg" },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363349375266377@newsletter',
                    newsletterName: '❮❮ 𝑻 𝑯 𝑬 - 𝑫 么 𝑹 𝑲 -𝑲𝑰𝑳𝑳𝑬𝑹 ❯❯',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
