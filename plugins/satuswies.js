const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const domain = `https://mr-manul-ofc-apis.vercel.app`;

//=============================================
cmd({
    pattern: "bt",
    alias: ["randomtiktok","randomtik","rtik"],
    desc: 'Download tiktok random Video',
    use: '.rtik Title',
    react: "🎬",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('කරුණාකර මාතෘකාවක් ලබා දෙන්න.');
        const response = await fetchJson(`${domain}/random-tiktok?apikey=Manul-Official-Key-3467&query=${q}`);
        const manul = response.data;
        const title = manul.title;
        const cover = manul.cover;
        const no_watermark = manul.no_watermark;
        const watermark = manul.watermark;
        const music = manul.music;
        
        let desc = `
*🎬 𝐓𝐈𝐊𝐓𝐎𝐊 ඩවුන්ලෝඩර් 🎬*

*මාතෘකාව -:* _~${title}~_

> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : KADAYA-MD🐉*
`;

        // බටන් සහිත පණිවිඩය යවන්න
        const buttons = [
            { buttonId: 'wm', buttonText: { displayText: 'වෝටර්මාර්ක් සමඟ ✅' }, type: 1 },
            { buttonId: 'nwm', buttonText: { displayText: 'වෝටර්මාර්ක් නැතිව ❎' }, type: 1 },
            { buttonId: 'audio', buttonText: { displayText: 'ඕඩියෝ 🎧' }, type: 1 }
        ];

        const buttonMessage = {
            image: { url: cover },
            caption: desc,
            footer: '> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : KADAY𝐀 🐉',
            buttons: buttons,
            headerType: 4
        };

        const vv = await conn.sendMessage(from, buttonMessage, { quoted: mek });

        // බටන් ප්‍රතිචාරය හසුරුවන්න
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.buttonResponseMessage) return;

            const selectedButton = msg.message.buttonResponseMessage.selectedButtonId;

            if (msg.key.remoteJid === from && msg.message.buttonResponseMessage.contextInfo?.stanzaId === vv.key.id) {
                switch (selectedButton) {
                    case 'wm':
                        await conn.sendMessage(from, {
                            video: { url: watermark },
                            mimetype: "video/mp4",
                            caption: "> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : 𝐤𝐚𝐝𝐚𝐲𝐚 🐉"
                        }, { quoted: mek });
                        break;

                    case 'nwm':
                        await conn.sendMessage(from, {
                            video: { url: no_watermark },
                            mimetype: "video/mp4",
                            caption: "> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : 𝐊𝐀𝐃𝐀𝐘𝐀 🐉"
                        }, { quoted: mek });
                        break;

                    case 'audio':
                        await conn.sendMessage(from, {
                            audio: { url: music },
                            mimetype: "audio/mpeg",
                            caption: "> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : 𝐊𝐀𝐃𝐀𝐘𝐀 🐉"
                        }, { quoted: mek });
                        break;

                    default:
                        reply("වලංගු නොවන විකල්පයක්. කරුණාකර වලංගු විකල්පයක් තෝරන්න 💗");
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('ඔබේ ඉල්ලීම සකසන විට දෝෂයක් ඇති විය.');
    }
});
//=============©𝐌𝐑 𝐌𝐀𝐍𝐔𝐋 𝐎𝐅𝐂 💚==========