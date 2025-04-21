const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const domain = `https://mr-manul-ofc-apis.vercel.app`;

cmd({
    pattern: "vt2",
    alias: ["vnote"],
    desc: 'Send a random TikTok video as Playable Through Viewer',
    use: '.rtik Title',
    react: "🎬",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('Please provide a title.');
        const response = await fetchJson(`${domain}/random-tiktok?apikey=Manul-Official-Key-3467&query=${q}`);
        const manul = response.data;
        const title = manul.title;
        const cover = manul.cover;
        const no_watermark = manul.no_watermark;
        const watermark = manul.watermark;
        const music = manul.music;

        let desc = `
*🎬 𝐓𝐈𝐊𝐓𝐎𝐊 𝐕𝐈𝐃𝐄𝐎 🎬*

*𝗧𝗶𝘁𝗹𝗲 -:* _~${title}~_

> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌 🐉*
`;

        // Sending the video directly as PTV (no watermark version by default)
        await conn.sendMessage(from, { 
            video: { url: no_watermark }, 
            caption: desc, 
            ptv: true, 
            mimetype: "video/mp4" 
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
});