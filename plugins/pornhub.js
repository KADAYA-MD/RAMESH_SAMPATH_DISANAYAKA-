const { cmd, commands } = require('../command');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions');

// Ringtone List with 50 Entries
cmd({
    pattern: "sring2",
    alias: ["tonesaa", "phonetonesaa"],
    desc: "Show ringtone list",
    category: "main",
    react: "🎶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const status = `*💚𝐊𝐀𝐃𝐀𝐘𝐀 MD RINGTONE💚*

╭━━〔*💚${new Date().getHours() < 12 ? '🌄 සුබ උදෑසනක් 🌄' : '🌛 සුබ රාත්‍රියක් 🌛'}💚*〕━━┈⊷
𝟏. 𝐐𝐮𝐞𝐫𝐤𝐲
𝟐. 𝐐𝐔𝐄𝐑𝐄𝐑 𝐐𝐔𝐄𝐑𝐄𝐌𝐎𝐒
𝟑. 𝐇𝐊𝟒𝟕 - 𝐐𝐮𝐞𝐫𝐲
𝟒. 𝐐𝐮𝐞𝐫𝐲-𝐬𝐦𝐬-𝐭𝐨𝐧𝐞
𝟓. 𝐐𝐮𝐞𝐫𝐢𝐝𝐚
𝟔. 𝐐𝐮𝐞𝐫𝐢𝐝𝐨
𝟕. 𝐐𝐮𝐞𝐫𝐞𝐫
𝟖. 𝐐𝐮𝐞𝐫𝐞𝐫𝐬𝐢𝐧
𝟗. 𝟖𝐛𝐢𝐭 𝐀𝐫𝐭 𝐎𝐟 𝐓𝐡𝐞𝐝𝐫𝐞𝐬𝐬
𝟏𝟎. 𝟖𝐛𝐢𝐭𝐚𝐫𝐭𝐨𝐟𝐭𝐡𝐞𝐝𝐫𝐞𝐬𝐬𝟐
𝟏𝟏. 𝐋𝐮𝐧𝐚𝐬 𝐅𝐮𝐭𝐮𝐫𝐞
𝟏𝟐. 𝐄𝐪𝐮𝐞𝐬𝐭𝐫𝐢𝐚 𝐆𝐢𝐫𝐥𝐬 𝐓𝐨𝐧𝐞
𝟏𝟑. 𝐏𝐨𝐧𝐲 𝐒𝐰𝐚𝐠
𝟏𝟒. 𝐌𝐢𝐥𝐤𝐬𝐡𝐚𝐤𝐞 𝐑𝐚𝐜𝐞
𝟏𝟓. 𝐄𝐯𝐢𝐥 𝐄𝐧𝐜𝐡𝐚𝐧𝐭𝐫𝐞𝐬𝐬
𝟏𝟔. 𝐘𝐚𝐲
𝟏𝟕. 𝐇𝐮𝐬𝐡 𝐍𝐨𝐰 𝐌𝐞𝐭𝐚𝐥 𝐍𝐨𝐰
𝟏𝟖. 𝐌𝐥𝐩 𝐘𝐚𝐲
𝟏𝟗. 𝐁𝐈𝐁𝐈𝐃𝐃𝐘-𝐁𝐎𝐎𝐏�{Y
𝟐𝟎. 𝐀𝐝𝐯𝐞𝐧𝐭𝐮𝐫𝐞
𝟐𝟏. 𝐒𝐚𝐧𝐝𝐰𝐢𝐜𝐡𝐞𝐬
𝟐𝟐. 𝐅𝐫𝐢𝐞𝐧𝐝𝐬𝐡𝐢𝐩
𝟐𝟑. 𝐑𝐞𝐝𝐡𝐞𝐚𝐫𝐭 - 𝐒𝐡𝐡
𝟐𝟒. 𝐅𝐥𝐮𝐭𝐭𝐞𝐫𝐛𝐞𝐞𝐩
𝟐𝟓. 𝐍𝐮𝐫𝐬𝐞 𝐑𝐞𝐝𝐡𝐞𝐚𝐫𝐭
𝟐𝟔. 𝐒𝐮𝐧𝐫𝐢𝐬𝐞 𝐌𝐞𝐥𝐨𝐝𝐲
𝟐𝟕. 𝐂𝐫𝐲𝐬𝐭𝐚𝐥 𝐃𝐫𝐨𝐩𝐬
𝟐𝟖. 𝐌𝐨𝐫𝐧𝐢𝐧𝐠 𝐁𝐫𝐞𝐞𝐳𝐞
𝟐𝟗. 𝐆𝐚𝐥𝐚𝐱𝐲 𝐍𝐨𝐭𝐞
𝟑𝟎. 𝐒𝐨𝐟𝐭 𝐄𝐜𝐡𝐨
𝟑𝟏. 𝐏𝐢𝐚𝐧𝐨 𝐖𝐡𝐢𝐬𝐩𝐞𝐫
𝟑𝟐. 𝐍𝐚𝐭𝐮𝐫𝐞 𝐂𝐚𝐥𝐥
𝟑𝟑. 𝐃𝐢𝐠𝐢𝐭𝐚𝐥 𝐃𝐚𝐰𝐧
𝟑𝟒. 𝐒𝐢𝐥𝐞𝐧𝐭 𝐏𝐮𝐥𝐬𝐞
𝟑𝟓. 𝐎𝐜𝐞𝐚𝐧 𝐖𝐚𝐯𝐞
𝟑𝟔. 𝐒𝐭𝐚𝐫𝐥𝐢𝐠𝐡𝐭 𝐂𝐡𝐢𝐦𝐞
𝟑𝟕. 𝐒𝐩𝐫𝐢𝐧𝐠 𝐁𝐥𝐨𝐨𝐦
𝟑𝟖. 𝐌𝐢𝐝𝐧𝐢𝐠𝐡𝐭 𝐒𝐞𝐫𝐞𝐧𝐚𝐝𝐞
𝟑𝟗. 𝐆𝐞𝐧𝐭𝐥𝐞 𝐑𝐚𝐢𝐧
𝟒𝟎. 𝐌𝐲𝐬𝐭𝐢𝐜 𝐓𝐨𝐧𝐞
𝟒𝟏. 𝐅𝐨𝐫𝐞𝐬𝐭 𝐖𝐢𝐧𝐝
𝟒𝟐. 𝐂𝐨𝐬𝐦𝐢𝐜 𝐁𝐞𝐚𝐭
𝟒𝟑. 𝐇𝐚𝐫𝐦𝐨𝐧𝐲 𝐑𝐢𝐬𝐞
𝟒𝟒. 𝐏𝐞𝐚𝐜𝐞𝐟𝐮𝐥 𝐕𝐢𝐛𝐞
𝟒𝟓. 𝐖𝐢𝐧𝐭𝐞𝐫 𝐅𝐫𝐨𝐬𝐭
𝟒𝟔. 𝐒𝐮𝐦𝐦𝐞𝐫 𝐆𝐥𝐨𝐰
𝟒𝟕. 𝐀𝐮𝐭𝐮𝐦𝐧 𝐋𝐞𝐚𝐟
𝟒𝟖. 𝐂𝐞𝐥𝐞𝐬𝐭𝐢𝐚𝐥 𝐒𝐨𝐮𝐧𝐝
𝟒𝟗. 𝐓𝐰𝐢𝐥𝐢𝐠𝐡𝐭 𝐃𝐚𝐧𝐜𝐞
𝟓𝟎. 𝐄𝐭𝐞𝐫𝐧𝐚𝐥 𝐍𝐨𝐭𝐞
╰──────────────┈⊷
*Reply with a number to download*
> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : 𝐤𝐚𝐝𝐚𝐲𝐚 💚`;

        const sentMsg = await conn.sendMessage(from, { 
            image: { url: `https://i.imgur.com/ZdEQXYr.jpeg` },
            caption: status
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        // Listen for reply
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const response = messageUpdate.messages[0];
            if (!response.message) return;
            
            const messageType = response.message.conversation || response.message.extendedTextMessage?.text;
            const isReplyToSentMsg = response.message.extendedTextMessage && 
                                   response.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                const ringtones = {
                    '1': 'Querky ringtone',
                    '2': 'QUERER QUEREMOS ringtone',
                    '3': 'HK47 Query ringtone',
                    '4': 'Query sms tone',
                    '5': 'Querida ringtone',
                    '6': 'Querido ringtone',
                    '7': 'Querer ringtone',
                    '8': 'Querersin ringtone',
                    '9': '8bit Art Of Thedress ringtone',
                    '10': '8bitart ofthedress2 ringtone',
                    '11': 'Lunas Future ringtone',
                    '12': 'Equestria Girls Tone',
                    '13': 'Pony Swag ringtone',
                    '14': 'Milkshake Race ringtone',
                    '15': 'Evil Enchantress ringtone',
                    '16': 'Yay mlp ringtone',
                    '17': 'Hush Now Metal Now ringtone',
                    '18': 'Mlp Yay ringtone',
                    '19': 'BIBIDDY-BOOPY ringtone',
                    '20': 'Adventure ringtone mlp',
                    '21': 'Sandwiches ringtone mlp',
                    '22': 'Friendship ringtone mlp',
                    '23': 'Redheart Shh ringtone',
                    '24': 'Flutterbeep ringtone',
                    '25': 'Nurse Redheart ringtone',
                    '26': 'Sunrise Melody ringtone',
                    '27': 'Crystal Drops ringtone',
                    '28': 'Morning Breeze ringtone',
                    '29': 'Galaxy Note ringtone',
                    '30': 'Soft Echo ringtone',
                    '31': 'Piano Whisper ringtone',
                    '32': 'Nature Call ringtone',
                    '33': 'Digital Dawn ringtone',
                    '34': 'Silent Pulse ringtone',
                    '35': 'Ocean Wave ringtone',
                    '36': 'Starlight Chime ringtone',
                    '37': 'Spring Bloom ringtone',
                    '38': 'Midnight Serenade ringtone',
                    '39': 'Gentle Rain ringtone',
                    '40': 'Mystic Tone ringtone',
                    '41': 'Forest Wind ringtone',
                    '42': 'Cosmic Beat ringtone',
                    '43': 'Harmony Rise ringtone',
                    '44': 'Peaceful Vibe ringtone',
                    '45': 'Winter Frost ringtone',
                    '46': 'Summer Glow ringtone',
                    '47': 'Autumn Leaf ringtone',
                    '48': 'Celestial Sound ringtone',
                    '49': 'Twilight Dance ringtone',
                    '50': 'Eternal Note ringtone'
                };

                if (!ringtones[messageType]) {
                    await conn.sendMessage(from, { text: "*Invalid ringtone number*" }, { quoted: response });
                    return;
                }

                await conn.sendMessage(from, { react: { text: '⬇️', key: response.key } });

                // Search and download
                const search = await yts(ringtones[messageType]);
                const data = search.videos[0];
                const url = data.url;
                const down = await fetchJson(`https://bandahealimaree-api-ytdl.hf.space/api/ytmp3?url=${url}`);
                const downloadUrl = down.download.downloadUrl;

                await conn.sendMessage(from, { react: { text: '⬆️', key: response.key } });

                // Send audio
                await conn.sendMessage(from, { 
                    audio: { url: downloadUrl }, 
                    mimetype: "audio/mpeg",
                    contextInfo: {
                        externalAdReply: {
                            title: data.title,
                            body: "Ringtone Download",
                            mediaType: 1,
                            sourceUrl: url,
                            thumbnailUrl: "https://i.imgur.com/ZdEQXYr.jpeg",
                            renderLargerThumbnail: true,
                            showAdAttribution: true
                        }
                    }
                }, { quoted: response });
            }
        });

    } catch (e) {
        console.error("Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});