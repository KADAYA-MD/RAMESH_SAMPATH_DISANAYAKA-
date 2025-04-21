
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const { readEnv } = require('../lib/database'); // readEnv එකත් එකතු කරනවා
const domain = `https://mr-manul-ofc-apis.vercel.app`;

//=============================================
cmd({
    pattern: "stiktok",
    alias: ["randomtiktok", "randomtik", "rtik"],
    desc: "Download tiktok random Video",
    use: '.rtik Title',
    react: "🎬",
    category: 'download',
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
                noQuery: "කරුණාකර මාතෘකාවක් ලබා දෙන්න.",
                desc: (title) => `
*🎬 ටික්ටොක් බාගත කිරීම 🎬*

*මාතෘකාව -:* _~${title}~_

*◄❪ මෙම පණිවිඩයට අංකයකින් පිළිතුරු දෙන්න ❫►*

1. වෝටර්මාර්ක් සමඟ ✅
2. වෝටර්මාර්ක් නැතිව ❎
3. ශ්‍රව්‍ය 🎧

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ*
`,
                invalidOption: "වැරදි විකල්පයක්. කරුණාකර වලංගු විකල්පයක් තෝරන්න 💗",
                error: "ඔබගේ ඉල්ලීම සකස් කිරීමේදී දෝෂයක් ඇති වුණා."
            },
            english: {
                noQuery: "Please provide a title.",
                desc: (title) => `
*🎬 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 🎬*

*𝗧𝗶𝘁𝗹𝗲 -:* _~${title}~_

*◄❪ Reply This Message With Numbers ❫►*

1. 𝗪𝗶𝘁𝗵 𝗪𝗮𝘁𝗲𝗿 𝗠𝗮𝗿𝗸 ✅
2. 𝗡𝗼 𝗪𝗮𝘁𝗲𝗿 𝗠𝗮𝗿𝗸 ❎
3. 𝗔𝗨𝗗𝗜𝗢 🎧

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ*
`,
                invalidOption: "Invalid option. Please select a valid option 💗",
                error: "An error occurred while processing your request."
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව ගැලපෙන්න පණිවිඩය තෝරනවා. නැත්නම් English යනවා

        if (!q) return reply(msg.noQuery);

        const response = await fetchJson(`${domain}/random-tiktok?apikey=Manul-Official-Key-3467&query=${q}`);
        const manul = response.data;
        const title = manul.title;
        const cover = manul.cover;
        const no_watermark = manul.no_watermark;
        const watermark = manul.watermark;
        const music = manul.music;

        const vv = await conn.sendMessage(from, { image: { url: cover }, caption: msg.desc(title) }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msgReceived = msgUpdate.messages[0];
            if (!msgReceived.message || !msgReceived.message.extendedTextMessage) return;

            const selectedOption = msgReceived.message.extendedTextMessage.text.trim();

            if (msgReceived.message.extendedTextMessage.contextInfo && msgReceived.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { video: { url: watermark }, mimetype: "video/mp4", caption: "> ⚜️සාදන ලද්දේ : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 🐉" }, { quoted: mek });
                        break;

                    case '2':
                        await conn.sendMessage(from, { video: { url: no_watermark }, mimetype: "video/mp4", caption: "> ⚜️සාදන ලද්දේ : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 🐉" }, { quoted: mek });
                        break;

                    case '3':
                        await conn.sendMessage(from, { audio: { url: music }, mimetype: "audio/mpeg", caption: "> ⚜️සාදන ලද්දේ : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 🐉" }, { quoted: mek });
                        break;

                    default:
                        reply(msg.invalidOption);
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(msg.error);
    }
});
//=============©𝐌𝐑 𝐌𝐀𝐍𝐔𝐋 𝐎𝐅𝐂 💚==========
