const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["menu", "hjgfhfhfh"],
    desc: "Bot online test",
    react: "🌸",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let cap = `
╭━━〔${new Date().getHours() < 12 ? '*🌄 සුබ උදෑසනක් 🌄*' : '*🌛 සුබ රාත්‍රියක්  🌛*'}〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *🤠 𝐎𝐰𝐧𝐞𝐫: RAMESH.S.DISANAYAKA🐉*
┃◈└───────────┈⊷
╰──────────────┈
┏━❮ 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐃𝐄𝐓𝐀𝐋𝐄𝐒🩵 ❯━
┃◈┃🤖 ʙᴏᴛ ɴᴀᴍᴇ :𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃
┃◈┃🔖 ᴠᴇʀsɪᴏɴ : 2.0
┃◈┃📟 ᴘʟᴀᴛғᴏʀᴍ : Linux
┃◈┃👨‍💻ᴏᴡɴᴇʀ: RAMESH
┃◈┃📆 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())} 
┃◈┃📈ʀᴀᴍ ᴜsᴀɢᴇ: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
┃◈┗━━━━━━━━━━━━━━𖣔𖣔
╰──────────────┈⊷
┏━❮🔢𝗥𝗘𝗟𝗣𝗬 𝗡𝗨𝗠𝗕𝗘𝗥❯━
┃◈╭─────────────·
┃◈┃•𝟏 || 𝐁𝐎𝐓 𝐒𝐏𝐄𝐄𝐃
┃◈┃•𝟐 || 𝐁𝐎𝐓 𝐌𝐄𝐍𝐔
┃◈└───────────┈⊷
┗━━━━━━━━━━━━━━𖣔𖣔
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  😹🖕 ᶜᵒᵈᵉʳ
`;
const aliveMessage = await conn.sendMessage(from, { 
            video: { url: `https://github.com/MR-LAKSIDU/test-web/blob/main/videoguru-20250414-084113212_vGmu7uQJ.mp4?raw=true` }, 
            mimetype: "video/mp4",
            ptv: true,
            contextInfo: {
                externalAdReply: {
                    title: "𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃",
                    body: "𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃",
                    mediaType: 1,
                    sourceUrl: "https://whatsapp.com/channel/0029Vao7dOmDOQISArwnHT0e",
                    thumbnailUrl: "https://ibb.co/8DD66xzg",
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });

        const sentMsg = await conn.sendMessage(from, {
            image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` },
            caption: cap,
            contextInfo: {
                mentionedJid: ['94760698006@s.whatsapp.net'],
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363349375266377@newsletter',
                    newsletterName: "𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'HASHI MD',
                    body: '𝐌𝐑 �𝐀𝐊𝐒𝐈𝐃𝐔�',
                    mediaType: 1,
                    sourceUrl: "https://whatsapp.com/channel/0029Vao7dOmDOQISArwnHT0e",
                    thumbnailUrl: 'https://i.imgur.com/c0pAsWe.jpeg',
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });

        const aliveMessageID = sentMsg.key.id; // Save the alive message ID

        // Define all menu lists
        const menu1 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*==❒⁠⁠⁠⁠ 👨‍💻 𝐎𝐖𝐍𝐄𝐑-𝐂𝐌𝐃 👨‍💻 ❒==*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「🐉𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛ�depart: true,
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: update
 │ 🏷️ᴜsᴇ: prefix update
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setting
 │ 🏷️ᴜsᴇ: prefix setting
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: version
 │ 🏷️ᴜsᴇ: prefix setting
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: jid
 │ 🏷️ᴜsᴇ: prefix jid
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: block
 │ 🏷️ᴜsᴇ: reply messege prefic block
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: unblock
 │ 🏷️ᴜsᴇ:reply messege prefix unblock
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: clearchat
 │ 🏷️ᴜsᴇ: reply messege prefix chearchat
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gjid
 │ 🏷️ᴜsᴇ: gjid
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: restart
 │ 🏷️ᴜsᴇ: prefix restart
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: save
 │ 🏷️ᴜsᴇ: reply messege prefix save
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: send
 │ 🏷️ᴜsᴇ: prefix send 10, Hashi bot
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setbio
 │ 🏷️ᴜsᴇ: prefix setbio
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: boom
 │ 🏷️ᴜsᴇ: prefix 499,Hashi Bot
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: leave
 │ 🏷️ᴜsᴇ: prefix leave
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bug
 │ 🏷️ᴜsᴇ: prefix bug
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: join
 │ 🏷️ᴜsᴇ: prefix join
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃ᶜᵒᵈᵉʳ
`;
        const menu2 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=❒🎡𝗠𝗢𝗩𝗜𝗘 𝗠𝗘𝗡𝗨 🎡❒=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「🐉𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : *
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:sinhalasub
 │ 🏷️ᴜsᴇ: prefix sinhalasub <movie name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:firemovie
 │ 🏷️ᴜsᴇ: prefix firemovie <movie name>
 ╰────────────────────✵✵
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;
        const menu3 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=❒⁠⁠⁠⁠ 🧠 𝐀𝐈-𝐂𝐌𝐃 🧠 ❒=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「🐉𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓 claws🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ai
 │ 🏷️ᴜsᴇ: prefix ai Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: aiimg
 │ 🏷️ᴜsᴇ: prefix aiimg <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: imagine2
 │ 🏷️ᴜsᴇ: prefix imagine2 <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: imagine3
 │ 🏷️ᴜsᴇ: prefix imagine3 <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: imagine4
 │ 🏷️ᴜsᴇ: prefix imagine4 <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bind
 │ 🏷️ᴜsᴇ: prefix bind Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gpt
 │ 🏷️ᴜsᴇ: prefix gpt Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bing
 │ 🏷️ᴜsᴇ: prefix bing Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: blackbox
 │ 🏷️ᴜsᴇ: prefix blackbox Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: siri
 │ 🏷️ᴜsᴇ: prefix siri Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gemini
 │ 🏷️ᴜsᴇ: prefix gemini Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: openai
 │ 🏷️ᴜsᴇ: prefix prefix openai Hellow
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;
        const menu4 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=❒⁠⁠⁠⁠🔎 𝐒𝐄𝐀𝐑𝐂𝐇-𝐂𝐌𝐃 🔍❒⁠⁠⁠⁠=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「🐉𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: all
 │ 🏷️ᴜsᴇ: prefix all <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: imagine2
 │ 🏷️ᴜsᴇ: prefix imagine2 <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: photo
 │ 🏷️ᴜsᴇ: prefix photo <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: wiki
 │ 🏷️ᴜsᴇ: prefix wiki <car>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: font
 │ 🏷️ᴜsᴇ: prefix font <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: cpt
 │ 🏷️ᴜsᴇ: prefix cpt <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: define
 │ 🏷️ᴜsᴇ: prefix define <car>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: sring
 │ 🏷️ᴜsᴇ: prefix sring <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dog
 │ 🏷️ᴜsᴇ: prefix dog <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: githubstalk
 │ 🏷️ᴜsᴇ: prefix githubstalk <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: google
 │ 🏷️ᴜsᴇ: prefix google <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hiru
 │ 🏷️ᴜsᴇ: prefix hiru
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: img
 │ 🏷️ᴜsᴇ: prefix img <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: rtik
 │ 🏷️ᴜsᴇ: prefix rtik <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: logo
 │ 🏷️ᴜsᴇ: prefix logo <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: movie
 │ 🏷️ᴜsᴇ: prefix movie <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: news
 │ 🏷️ᴜsᴇ: prefix news
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: npm
 │ 🏷️ᴜsᴇ: prefix npm <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: wallpaper
 │ 🏷️ᴜsᴇ: prefix wallapaper <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: quote
 │ 🏷️ᴜsᴇ: prefix quote <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dj
 │ 🏷️ᴜsᴇ: prefix dj <song name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: sp
 │ 🏷️ᴜsᴇ: prefix sp <song name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tiktoksearch
 │ 🏷️ᴜsᴇ: prefix titoksearch <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: stt
 │ 🏷️ᴜsᴇ: prefix stt <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: yta
 │ 🏷️ᴜsᴇ: prefix yta <song or video name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: api
 │ 🏷️ᴜsᴇ: prefix api <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: yts
 │ 🏷️ᴜsᴇ: prefix yts <song or video name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tstalk 
 │ 🏷️ᴜsᴇ: prefix stalk <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: weather
 │ 🏷️ᴜsᴇ: prefix weather <city name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: derana
 │ 🏷️ᴜsᴇ : prefix derana
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: epi
 │ 🏷️ᴜsᴇ: prefix epi <name>
 ╰────────────────────✵✵
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;
        const menu5 = `
◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=❒⁠⁠⁠⁠📥𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑-𝐂𝐌𝐃 📥❒=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「🐉𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: all 
 │ 🏷️ᴜsᴇ: prefix all <song/video/img/name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: song3
 │ 🏷️ᴜsᴇ: prefix song3 <song name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: epi
 │ 🏷️ᴜsᴇ: prefix epi <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ringdl
 │ 🏷️ᴜsᴇ: prefix epi <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dj
 │ 🏷️ᴜsᴇ: prefix dj <song name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: song
 │ 🏷️ᴜsᴇ: prefix song <name or link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: git
 │ 🏷️ᴜsᴇ: prefix git <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: video
 │ 🏷️ᴜsᴇ: prefix video <name or link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: video2
 │ 🏷️ᴜsᴇ: prefix video2 <name or link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: rtik
 │ 🏷️ᴜsᴇ: prefix rtik <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: lkdl
 │ 🏷️ᴜsᴇ: prefix lkdl <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ig
 │ 🏷️ᴜsᴇ: prefix ig <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tiktok
 │ 🏷️ᴜsᴇ: prefix tiktok <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: fb
 │ 🏷️ᴜsᴇ: prefix fb <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: twitter
 │ 🏷️ᴜsᴇ: prefix twitter <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: mfire
 │ 🏷️ᴜsᴇ: prefix mfire <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: apk
 │ 🏷️ᴜsᴇ: prefix apk <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gdrive
 │ 🏷️ᴜsᴇ: prefix gdrive <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: fb2
 │ 🏷️ᴜsᴇ: prefix fb2 <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: logo
 │ 🏷️ᴜsᴇ: prefix logo <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: yts
 │ 🏷️ᴜsᴇ: prefix yts <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: wallpaper
 │ 🏷️ᴜsᴇ: prefix wallpaper <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: stt
 │ 🏷️ᴜsᴇ: prefix stt <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tiktoksearch
 │ 🏷️ᴜsᴇ: prefix tiktoksearch <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: rtik
 │ 🏷️ᴜsᴇ: prefix rtik <name>
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;
        const menu6 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=❒⁠⁠⁠⁠🗝️𝐌𝐀𝐈𝐍 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓🗝️❒⁠⁠⁠⁠=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「🐉𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: menu
 │ 🏷️ᴜsᴇ: prefix menu
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: alive
 │ 🏷️ᴜsᴇ: prefix alive
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: update
 │ 🏷️ᴜsᴇ: prefix update
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ping
 │ 🏷️ᴜsᴇ: prefix ping 
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ping2
 │ 🏷️ᴜsᴇ: prefix ping2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: system
 │ 🏷️ᴜsᴇ: prefix system
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: about
 │ 🏷️ᴜsᴇ: prefix about
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: help
 │ 🏷️ᴜsᴇ: prefix help
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: pair
 │ 🏷️ᴜsᴇ: prefix pair <+9477XXXXXXX>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setting
 │ 🏷️ᴜsᴇ: prefix setting
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: owner
 │ 🏷️ᴜsᴇ: prefix owner
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: br
 │ 🏷️ᴜsᴇ: prefix br <message>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: shutdown
 │ 🏷️ᴜsᴇ: prefix shutdown
 ╰────────────────────✵✵
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;
        const menu7 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=❒𝗖𝗢𝗡𝗩𝗘𝗥𝗧 𝗠𝗘𝗡𝗨❒⁠⁠⁠⁠=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: sticker
 │ 🏷️ᴜsᴇ: prefix sticker reply message
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tts
 │ 🏷️ᴜsᴇ: prefix tts text
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tts2
 │ 🏷️ᴜsᴇ: prefix tts <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tts3
 │ 🏷️ᴜsᴇ: prefix tts3 <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: url
 │ 🏷️ᴜsᴇ: prefix url reply message
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: take
 │ 🏷️ᴜsᴇ: prefix take reply message
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: sticker
 │ 🏷️ᴜsᴇ: prefix sticker reply message
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: rcolor
 │ 🏷️ᴜsᴇ: prefix rcolor <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: binary
 │ 🏷️ᴜsᴇ: prefix binary <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dbinary
 │ 🏷️ᴜsᴇ: prefix dbinary <binary code>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: base64
 │ 🏷️ᴜsᴇ: prefix base64 text
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: unbase
 │ 🏷️ᴜsᴇ: prefix unbase <unbase code>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: urlencode
 │ 🏷️ᴜsᴇ: prefix urlencode
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: urldecode
 │ 🏷️ᴜsᴇ: prefix urldecode <urlencode>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: vsticker
 │ 🏷️ᴜsᴇ: prefix vsticker reply gift
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: readmore
 │ 🏷️ᴜsᴇ: prefix readmore <message>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;
        const menu8 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=𝗢𝗧𝗛𝗘𝗥 𝗠𝗘𝗡𝗨=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「🐉𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : ᴍʀ ʟᴀᴋꜱɪᴅᴜ*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:cpp
 │ 🏷️ᴜsᴇ:prefix cpp
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: emix
 │ 🏷️ᴜsᴇ: prefix emix <emoji,emoji>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: del
 │ 🏷️ᴜsᴇ: prefix del <reply message>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: br
 │ 🏷️ᴜsᴇ: prefix br <message>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setpp
 │ 🏷️ᴜsᴇ: prefix setpp
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gpass
 │ 🏷️ᴜsᴇ: prefix gpass
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: timenow
 │ 🏷️ᴜsᴇ: prefix timenow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: date
 │ 🏷️ᴜsᴇ: prefix date
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: count
 │ 🏷️ᴜsᴇ: prefix count
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: calc
 │ 🏷️ᴜsᴇ: prefix calc <2+8>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: pdf
 │ 🏷️ᴜsᴇ: prefix pdf <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;
        const menu9 = `
❢◥ ▬▬▬▬▬▬▬ ◆ ▬▬▬▬▬▬▬ ◤❢
*=❒𝗟𝗢𝗚𝗢 𝗠𝗘𝗡𝗨❒⁠⁠⁠⁠=*
❢◥ ▬▬▬▬▬▬▬ ◆ ▬▬▬▬▬▬▬ ◤❢
*╭─「𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 2.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: logo
 │ 🏷️ᴜsᴇ: prefix logo <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: logo2
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;
        const menu10 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=❒𝗙𝗨𝗡 𝗠𝗘𝗡𝗨❒⁠⁠⁠⁠=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: loli
 │ 🏷️ᴜsᴇ: prefix loli
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: waifu
 │ 🏷️ᴜsᴇ: prefix waifu
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: neko
 │ 🏷️ᴜsᴇ: prefix neko
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: megumin
 │ 🏷️ᴜsᴇ: prefix megumin
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: maid
 │ 🏷️ᴜsᴇ: prefix maid
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: awoo
 │ 🏷️ᴜsᴇ: prefix awoo
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: happly
 │ 🏷️ᴜsᴇ: prefix happly
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: heart
 │ 🏷️ᴜsᴇ: prefix heart
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: angry
 │ 🏷️ᴜsᴇ: prefix angry
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: sad
 │ 🏷️ᴜsᴇ: prefix sad
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: shy
 │ 🏷️ᴜsᴇ: prefix shy
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: moon
 │ 🏷️ᴜsᴇ: prefix moon
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: confused
 │ 🏷️ᴜsᴇ: prefix confused
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hot
 │ 🏷️ᴜsᴇ: prefix hot
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: fact
 │ 🏷️ᴜsᴇ: prefix fact
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: fchek
 │ 🏷️ᴜsᴇ: prefix fchek
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: aura
 │ 🏷️ᴜsᴇ: prefix aura
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: roast
 │ 🏷️ᴜsᴇ: prefix roast
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: 8ball
 │ 🏷️ᴜsᴇ: prefix 8ball
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: compliment
 │ 🏷️ᴜsᴇ: prefix compliment
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: lovetest
 │ 🏷️ᴜsᴇ: prefix lovetest
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: emoji
 │ 🏷️ᴜsᴇ: prefix emoji
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hack
 │ 🏷️ᴜsᴇ: prefix hack
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: cry
 │ 🏷️ᴜsᴇ: prefix cry
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: cuddle
 │ 🏷️ᴜsᴇ: prefix cuddle
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bully
 │ 🏷️ᴜsᴇ: prefix bully
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hug
 │ 🏷️ᴜsᴇ: prefix hug
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: lick
 │ 🏷️ᴜsᴇ: prefix lick
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: put
 │ 🏷️ᴜsᴇ: prefix put
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: smug
 │ 🏷️ᴜsᴇ: prefix smug 
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bonk
 │ 🏷️ᴜsᴇ: prefix bonk
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: yeet
 │ 🏷️ᴜsᴇ: prefix yeet
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: blush
 │ 🏷️ᴜsᴇ: prefix blush
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: handhold
 │ 🏷️ᴜsᴇ: prefix handhold
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: highfive
 │ 🏷️ᴜsᴇ: prefix highfive
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: nom
 │ 🏷️ᴜsᴇ: prefix nom
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: wave
 │ 🏷️ᴜsᴇ: prefix wave
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: smile
 │ 🏷️ᴜsᴇ: prefix smile
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: wink
 │ 🏷️ᴜsᴇ: prefix wink
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: happy
 │ 🏷️ᴜsᴇ: prefix happy
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: glomp
 │ 🏷️ᴜsᴇ: prefix glomp
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bite
 │ 🏷️ᴜsᴇ: prefix bite
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: poke
 │ 🏷️ᴜsᴇ: prefix poke
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: cringe
 │ 🏷️ᴜsᴇ: prefix cringe
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dance
 │ 🏷️ᴜsᴇ: prefix dance
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: kill
 │ 🏷️ᴜsᴇ: prefix kill
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: slap
 │ 🏷️ᴜsᴇ: prefix slap
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: kiss
 │ 🏷️ᴜsᴇ: prefix kiss
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ship
 │ 🏷️ᴜsᴇ: prefix ship
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: roll
 │ 🏷️ᴜsᴇ: prefix roll
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: coinflip
 │ 🏷️ᴜsᴇ: prefix coinflip
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: flip
 │ 🏷️ᴜsᴇ: prefix flip
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: pick
 │ 🏷️ᴜsᴇ: prefix pick
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: rate
 │ 🏷️ᴜsᴇ: prefix rate
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: countx
 │ 🏷️ᴜsᴇ: prefix countx
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: joke
 │ 🏷️ᴜsᴇ: prefix joke
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: flirt
 │ 🏷️ᴜsᴇ: prefix flirt
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: truth
 │ 🏷️ᴜsᴇ: prefix truth
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dave
 │ 🏷️ᴜsᴇ: prefix dave
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: pickup
 │ 🏷️ᴜsᴇ: prefix pickup
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: char
 │ 🏷️ᴜsᴇ: prefix char
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: repeat
 │ 🏷️ᴜsᴇ: prefix repeat
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;
        const menu11 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=❒👥𝐆𝐑𝐎𝐔𝐏-𝐂𝐌𝐃👥❒⁠⁠⁠⁠=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「🐉𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: autoai on
 │ 🏷️ᴜsᴇ: prefix autoai on
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: startwallpaper
 │ 🏷️ᴜsᴇ: prefix startwallpaper
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: stopwallpaper
 │ 🏷️ᴜsᴇ: prefix stopwallapaper
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: admins
 │ 🏷️ᴜsᴇ: prefix admins
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: groupdesc
 │ 🏷️ᴜsᴇ: prefix groupdesc
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: groupinfo
 │ 🏷️ᴜsᴇ: prefix groupinfo
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: grouplink
 │ 🏷️ᴜsᴇ: prefix grouplink
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gname
 │ 🏷️ᴜsᴇ: prefix gname
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setsubject
 │ 🏷️ᴜsᴇ: prefix setsubject
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tagall
 │ 🏷️ᴜsᴇ: prefix tagall
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: requests
 │ 🏷️ᴜsᴇ: prefix requests
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: accept
 │ 🏷️ᴜsᴇ: prefix accept
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:reject
 │ 🏷️ᴜsᴇ: prefix reject
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: unlock
 │ 🏷️ᴜsᴇ: prefix unlock
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: lock
 │ 🏷️ᴜsᴇ: prefix lock
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: approve
 │ 🏷️ᴜsᴇ: prefix approve
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: poll
 │ 🏷️ᴜsᴇ: prefix poll
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: getpic
 │ 🏷️ᴜsᴇ: prefix getpic
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: add3
 │ 🏷️ᴜsᴇ: prefix add3 <9477XXXX>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:appove
 │ 🏷️ᴜsᴇ: prefix appove
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: promote
 │ 🏷️ᴜsᴇ: prefix promote
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: demote
 │ 🏷️ᴜsᴇ: prefix demote
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: requests2
 │ 🏷️ᴜsᴇ: prefix requests2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tagall2
 │ 🏷️ᴜsᴇ: prefix tagall2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:accept2
 │ 🏷️ᴜsᴇ: prefix accept2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: reject
 │ 🏷️ᴜsᴇ: prefix reject
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: leave2
 │ 🏷️ᴜsᴇ: prefix leave2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: invite
 │ 🏷️ᴜsᴇ: prefix invite
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: add
 │ 🏷️ᴜsᴇ: prefix add <9477XXX>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: end
 │ 🏷️ᴜsᴇ: prefix end
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tagadmin2
 │ 🏷️ᴜsᴇ: prefix tagadmin2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: mute2
 │ 🏷️ᴜsᴇ: prefix mute2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: unmute2
 │ 🏷️ᴜsᴇ: prefix unmute2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: kick
 │ 🏷️ᴜsᴇ: prefix kick
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setname 
 │ 🏷️ᴜsᴇ: prefix setname <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setdesc2 
 │ 🏷️ᴜsᴇ: prefix setdesc2 <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: opemtime2
 │ 🏷️ᴜsᴇ: prefix opentime2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: closetime
 │ 🏷️ᴜsᴇ: prefix closetime
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: join
 │ 🏷️ᴜsᴇ: prefix join
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hidetag2
 │ 🏷️ᴜsᴇ: prefix hidetag2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: kickall
 │ 🏷️ᴜsᴇ: prefix kickall
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: mute
 │ 🏷️ᴜsᴇ: prefix mute
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: unmute
 │ 🏷️ᴜsᴇ: prefix unmute
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  𝐊𝐀𝐃𝐀𝐘𝐀ᶜᵒᵈᵉʳ
`;
        const menu12 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=❒ AUTO SEND ❒⁠⁠⁠⁠=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「🐉𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: autoai
 │ 🏷️ᴜsᴇ: prefix autoai on
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: autoai 
 │ 🏷️ᴜsᴇ: prefix autoai off
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:startnews
 │ 🏷️ᴜsᴇ: prefix startnews
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: stopnews
 │ 🏷️ᴜsᴇ: prefix stopnews
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: starttiktok
 │ 🏷️ᴜsᴇ: prefix starttiktok
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: startsong
 │ 🏷️ᴜsᴇ: prefix startsong
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: startwallpaper
 │ 🏷️ᴜsᴇ: prefix startwallpaper
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: stopwallpaper
 │ 🏷️ᴜsᴇ: prefix stopwallpaper
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  𝐊𝐀𝐃𝐀𝐘𝐀ᶜᵒᵈᵉʳ
`;
        const menu13 = `
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*=❒ NEWS MENU❒⁠⁠⁠⁠=*
❢◥ ▬▬▬▬▬ ◆ ▬▬▬▬▬ ◤❢
*╭─「🐉𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓🐉」*
*│ 🔥 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│ 🔥 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│ 🔥 ᴠᴇʀꜱɪᴏɴ : 1.0*
*│ 🔥 ᴏᴡɴᴇʀ : 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰──────────●●*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: derana
 │ 🏷️ᴜsᴇ: prefix derana
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hiru
 │ 🏷️ᴜsᴇ: prefix hiru
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:sirasa
 │ 🏷️ᴜsᴇ: prefix sirasa
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: itn
 │ 🏷️ᴜsᴇ: prefix itn
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: lankadeepa
 │ 🏷️ᴜsᴇ: prefix lankadeepa
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bbc
 │ 🏷️ᴜsᴇ: prefix bbc
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: siyatha
 │ 🏷️ᴜsᴇ: prefix siyatha
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: siyatha
 │ 🏷️ᴜsᴇ: prefix siyatha
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃
`;

        // Event listener for replies
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;

            // Check if the message is a reply to the alive message
            const isReplyToAliveMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === aliveMessageID;
            if (isReplyToAliveMsg) {
                if (messageType === '1') {
                    // Ping command
                    const startTime = Date.now();
                    const pongMessage = await conn.sendMessage(from, { text: '*pong...*' });
                    const endTime = Date.now();
                    const ping = endTime - startTime;
                    await conn.sendMessage(from, { 
                        text: `*ꜱᴘᴇᴇᴅ : ${ping}ms*`,
                        contextInfo: {
                            mentionedJid: ['94760698006@s.whatsapp.net'],
                            groupMentions: [],
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363349375266377@newsletter',
                                newsletterName: "",
                                serverMessageId: 999
                            },
                            externalAdReply: {
                                title: '☆𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃☆',
                                body: '𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃💚',
                                mediaType: 1,
                                sourceUrl: "https://wa.me/+94766002356?text=HEY_kadaya_owner😩⃝⃚💗⃝⃚🍓🪄🤍",
                                thumbnailUrl: 'https://i.ibb.co/M5p9dt2d/6514c455419b2a6c.jpg',
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                    }, { quoted: mek });
                } else if (messageType === '2') {
                    // Menu command
                    const menuCap = `
*🍓🍟  හායි ${pushname} කොහමද ඔයාට😝♦*

*┏〔${new Date().getHours() < 12 ? '🌄 සුබ උදෑසනක්  🌄*' : '🌛 සුබ රාත්‍රියක් 🌛*'}〕
*┃🤖 ʙᴏᴛ ɴᴀᴍᴇ : 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃*
*┃🔖 ᴠᴇʀsɪᴏɴ : 2.0*
*┃📟 ᴘʟᴀᴛғᴏʀᴍ : Linux*
*┃👨‍💻 ᴏᴡɴᴇʀ𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃*
*┃📆 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}* 
*┃📈 ʀᴀᴍ ᴜsᴀɢᴇ: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*┗━━━━━━━━━━━━━━𖣔𖣔*

╭━━〔🔢ʀᴇᴘʟʏ ᴛʜᴇ ɴᴜᴍʙᴇʀ〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃•➪ 𝟭  𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟮  𝗠𝗢𝗩𝗜𝗘 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟯  𝗔𝗜 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟰  𝗦𝗘𝗔𝗥𝗖𝗛 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟱  𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟲  𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟳  𝗖𝗢𝗡𝗩𝗘𝗥𝗧 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟴  𝗢𝗧𝗛𝗘𝗥 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟵  𝗟𝗢𝗚𝗢 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟭𝟬 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟭𝟭 𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟭𝟮 𝗔𝗨𝗧𝗢 𝗠𝗘𝗡𝗨
┃◈┃•➪ 𝟭𝟯 𝗡𝗘𝗪𝗦 𝗠𝗘𝗡𝗨
┃◈└──────────────┈⊷
╰──────────────────┈⊷
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃ᶜᵒᵈᵉʳ
`;
                    await conn.sendMessage(from, { 
                        audio: { url: `https://github.com/MR-LAKSIDU/test-web/blob/main/menu.mp3?raw=true` }, 
                        mimetype: "audio/mpeg",
                        ptt: "true",
                        contextInfo: {
                            externalAdReply: {
                                title: "𝐐𝐔𝐄𝐄𝐍 𝐇𝐀𝐒𝐇𝐈",
                                body: "𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃💚",
                                mediaType: 1,
                                sourceUrl: "https://whatsapp.com/channel/0029Vao7dOmDOQISArwnHT0e",
                                thumbnailUrl: "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                    }, { quoted: mek });

                    const menuMsg = await conn.sendMessage(from, {
                        image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` },
                        caption: menuCap,
                        contextInfo: {
                            mentionedJid: ['94760698006@s.whatsapp.net'],
                            groupMentions: [],
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363349375266377@newsletter',
                                newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐇𝐀𝐒𝐇𝐈",
                                serverMessageId: 999
                            }
                        }
                    }, { quoted: mek });

                    const menuMessageID = menuMsg.key.id; // Save the menu message ID

                    // Check for replies to the menu message
                    conn.ev.on('messages.upsert', async (menuUpdate) => {
                        const menuMek = menuUpdate.messages[0];
                        if (!menuMek.message) return;
                        const menuMessageType = menuMek.message.conversation || menuMek.message.extendedTextMessage?.text;
                        const menuFrom = menuMek.key.remoteJid;

                        const isReplyToMenuMsg = menuMek.message.extendedTextMessage && menuMek.message.extendedTextMessage.contextInfo.stanzaId === menuMessageID;
                        if (isReplyToMenuMsg) {
                            switch (menuMessageType) {
                                case '1':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu1 }, { quoted: menuMek });
                                    break;
                                case '2':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu2 }, { quoted: menuMek });
                                    break;
                                case '3':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu3 }, { quoted: menuMek });
                                    break;
                                case '4':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu4 }, { quoted: menuMek });
                                    break;
                                case '5':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu5 }, { quoted: menuMek });
                                    break;
                                case '6':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu6 }, { quoted: menuMek });
                                    break;
                                case '7':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu7 }, { quoted: menuMek });
                                    break;
                                case '8':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu8 }, { quoted: menuMek });
                                    break;
                                case '9':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu9 }, { quoted: menuMek });
                                    break;
                                case '10':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu10 }, { quoted: menuMek });
                                    break;
                                case '11':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu11 }, { quoted: menuMek });
                                    break;
                                case '12':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu12 }, { quoted: menuMek });
                                    break;
                                case '13':
                                    await conn.sendMessage(menuFrom, { image: { url: `https://i.ibb.co/zwhqLSQ/20250406-120212.jpg` }, caption: menu13 }, { quoted: menuMek });
                                    break;
                                default:
                                    await conn.sendMessage(menuFrom, { text: 'කරුණාකර 1-13 අතර අංකයක් තෝරන්න!' }, { quoted: menuMek });
                                    break;
                            }
                        }
                    });
                }
            }
        });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});