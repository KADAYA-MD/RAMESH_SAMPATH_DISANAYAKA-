const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const { readEnv } = require('../lib/database');

cmd({
    pattern: "botinfo",
    alias: ["system", "hjgfhfhfh"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
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
                greetingMorning: '🌄 සුබ උදෑසනක් 🌄',
                greetingNight: '🌛 සුබ රාත්‍රියක් 🌛',
                nameLabel: '📝නම',
                botNameLabel: '🤖 බොට් නම',
                botName: 'Y2x_4! Ｋ  Ａ  Ｄ  Ａ  Ｙ-ᴍᴅ',
                sectionTitle: '╭━━〔 *𝗞𝗔𝗗𝗔𝗬𝗔 𝙈𝘿* 〕━━┈⊷',
                speed: '👽 වේගය:  10ms',
                network: '📡 ජාලය:  16%',
                powerUsage: '📌 බලශක්ති භාවිතය: අඩු',
                cpu: '💥 සීපීයූ:  Intel Core i5-13400F',
                baseSpeed: '💀 මූලික වේගය: 3.6GHz',
                owner: '☠️ හිමිකරු: 𝗥𝗔𝗠𝗘𝗦𝗛𝘀𝗮𝗺𝗽𝗮𝘁𝗵🐉',
                utilization: '⚡️ භාවිතය: 12%',
                detailsTitle: '┏━❮ Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌තොරතුරු🩵 ❯━',
                version: '🔖 සංස්කරණය: 2.0',
                platform: '📟 වේදිකාව: Linux',
                runtime: '📆 ධාවන කාලය',
                ramUsage: '📈රැම් භාවිතය',
                error: (e) => `දෝෂයක් ඇති වුණා: ${e.message}`
            },
            english: {
                greetingMorning: '🌄 Good Morning 🌄',
                greetingNight: '🌛 Good Night 🌛',
                nameLabel: '📝Name',
                botNameLabel: '🤖 Bot Name',
                botName: '💚𝙺_𝙰_𝙳_𝙰_𝚈_𝙰__𝙼𝙳❤️',
                sectionTitle: '╭━━〔 *💚𝙺_𝙰_𝙳_𝙰_𝚈_𝙰__𝙼𝙳❤️* 〕━━┈⊷',
                speed: '👽 Speed:  10ms',
                network: '📡 Network:  16%',
                powerUsage: '📌 Power usage: low',
                cpu: '💥 CPU:  Intel Core i5-13400F',
                baseSpeed: '💀 Base speed: 3.6GHz',
                owner: '☠️ Owner: 𝗥𝗔𝗠𝗘𝗦𝗛🐉',
                utilization: '⚡️ Utilization: 12%',
                detailsTitle: '┏━❮ 𝗸𝗮𝗱𝗮𝘆𝗮 Details🩵 ❯━',
                version: '🔖 Version: 2.0',
                platform: '📟 Platform: Linux',
                runtime: '📆 Runtime',
                ramUsage: '📈RAM Usage',
                error: (e) => `An error occurred: ${e.message}`
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව ගැලපෙන්න පණිවිඩය තෝරනවා. නැත්නම් English යනවා

        // පද්ධති තත්ත්ව පණිවිඩය සාදන්න
        const status = `┏「${new Date().getHours() < 12 ? msg.greetingMorning : msg.greetingNight}」
┃ ${msg.nameLabel} : ${pushname} 
┃ ${msg.botNameLabel} : ${msg.botName}
┗━━━━━━━━━━━━━━━𖣔𖣔
${msg.sectionTitle}
┃◈╭─────────────·๏
┃◈┃• *${msg.speed}* 
┃◈┃• *${msg.network}* 
┃◈┃• *${msg.powerUsage}* 
┃◈┃• *${msg.cpu}* 
┃◈┃• *${msg.baseSpeed}*
┃◈┃• *${msg.owner}*
┃◈┃• *${msg.utilization}*
┃◈└───────────┈⊷
╰──────────────┈⊷
${msg.detailsTitle}
┃◈┃${msg.botNameLabel} :${msg.botName}
┃◈┃${msg.version}
┃◈┃${msg.platform}
┃◈┃👨‍💻${msg.owner}
┃◈┃${msg.runtime} : ${runtime(process.uptime())} 
┃◈┃${msg.ramUsage}: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
┃◈┗━━━━━━━━━━━━━━𖣔𖣔
╰──────────────┈⊷
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;

        // තත්ත්ව පණිවිඩය රූපයක් සමඟ යවන්න
        await conn.sendMessage(from, { 
            image: { url: "https://i.ibb.co/M5p9dt2d/6514c455419b2a6c.jpg" },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: ' ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in botinfo command:", e);
        reply(messages[language]?.error(e) || messages.english.error(e));
    }
});
