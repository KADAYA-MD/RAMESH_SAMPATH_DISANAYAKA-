
//=============================================
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const domain = `https://mr-manul-ofc-apis.vercel.app`;

//=============================================
cmd({
    pattern: "rtiktok",
    alias: ["randomtiktok", "randomtik", "rtik"],
    desc: 'ටික්ටොක් වීඩියෝ එකක් ඩවුන්ලෝඩ් කරන්න',
    use: '.rtik මාතෘකාව',
    react: "🎬",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('කරුණාකර මාතෘකාවක් දෙන්න.');
        const response = await fetchJson(`${domain}/random-tiktok?apikey=Manul-Official-Key-3467&query=${q}`);
        const manul = response.data;
        const title = manul.title;
        const cover = manul.cover;
        const no_watermark = manul.no_watermark;
        const watermark = manul.watermark;
        const music = manul.music;
        let desc = `
*🎬 ටික්ටොක් ඩවුන්ලෝඩර් 🎬*

*මාතෘකාව -:* _~${title}~_

*◄❪ මෙම පණිවිඩයට අංකයක් සමඟ පිළිතුරු දෙන්න ❫►*

1. WATERMAK ✅
2. NOT WATERMAK❎
3. AUDIO🎧
4. VIDEO NOTE 📺

> ⚜️සහය දක්වයි : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌 🐉*
`;

        const vv = await conn.sendMessage(from, { image: { url: cover }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { video: { url: watermark }, mimetype: "video/mp4", caption: "> ⚜️සහය දක්වයි : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌 🐉" }, { quoted: mek });
                        break;

                    case '2':
                        await conn.sendMessage(from, { video: { url: no_watermark }, mimetype: "video/mp4", caption: "> ⚜️සහය දක්වයි : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌🐉" }, { quoted: mek });
                        break;

                    case '3':
                        await conn.sendMessage(from, { audio: { url: music }, mimetype: "audio/mpeg", caption: "> ⚜️සහය දක්වයි : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌🐉" }, { quoted: mek });
                        break;

                    case '4':
                        await conn.sendMessage(from, { 
                            video: { url: no_watermark }, 
                            caption: "> Playable Through Viewer හරහා බලන්න!\n⚜️සහය දක්වයි : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌🐉", 
                            ptv: true, 
                            mimetype: "video/mp4" 
                        }, { quoted: mek });
                        break;

                    default:
                        reply("වැරදි තේරීමක්. කරුණාකර නිවැරදි තේරීමක් කරන්න 💗");
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('ඔබේ ඉල්ලීම ක්‍රියාත්මක කිරීමේදී දෝෂයක් ඇති වුණා.');
    }
});
//=============©𝐌𝐑 ᴋᴀᴅᴀʏ 𝐎𝐅𝐂 💚==========