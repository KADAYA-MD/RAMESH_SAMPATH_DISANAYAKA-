const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require("axios");

cmd({
    pattern: "ringdl",
    alias: ["tonesaa", "phonetonesaa", "ringtone"],
    desc: "රිංටෝන් ලිස්ට් එකක් පෙන්වන්න සහ ඩවුන්ලෝඩ් කරන්න",
    category: "main",
    react: "🎶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ringtone list
        const ringtoneList = [
            "Quarky", "QUERER QUEREMOS", "HK47 - Query", "Query-sms-tone", "Querida", "Querido", "Querer", "Querersin", "8bit Art Of Thedress", "8bitartofthedress2",
            "Lunas Future", "Equestria Girls Tone", "Pony Swag", "Milkshake Race", "Evil Enchantress", "Yay", "Hush Now Metal Now", "Mlp Yay", "BIBIDDY-BOOPY", "Adventure",
            "Sandwiches", "Friendship", "Redheart - Shh", "Flutterbeep", "Nurse Redheart", "Crystal Melody", "Midnight Sparkle", "Harmony Drops", "Starlight Chime", "Twilight Whistle",
            "Rainbow Beat", "Sunset Shimmer", "Moonlit Serenade", "Galaxy Tone", "Celestial Harmony", "Dawn Whisper", "Stardust Echo", "Mystic Rhythm", "Solar Flare", "Lunar Dance",
            "Cosmic Call", "Ethereal Vibe", "Prism Pulse", "Nebula Note", "Orbital Ode", "Sparkle Symphony", "Glowing Glissando", "Radiant Refrain", "Shimmering Sound", "Aurora Alert",
            "Comet Chirp", "Meteor Melody", "Stellar Signal", "Planetary Ping", "Oceanic Overture", "Wave Whisper", "Tidal Tune", "Coral Call", "Seashell Song", "Breeze Bells",
            "Windy Waltz", "Stormy Strings", "Thunder Theme", "Lightning Lullaby", "Forest Fantasy", "Leafy Lyrics", "Branch Beats", "Pine Pulse", "Mossy Motif", "Desert Dream",
            "Sandy Serenade", "Oasis Opus", "Dune Ditty", "Mirage Music", "Mountain Melody", "Peak Pipes", "Ridge Rhythm", "Summit Sound", "Valley Vibe", "River Riff",
            "Stream Symphony", "Waterfall Whistle", "Creek Chime", "Lake Lullaby", "Firefly Flute", "Glowworm Glee", "Lantern Light", "Candle Call", "Spark Song", "Diamond Dance",
            "Ruby Rhyme", "Sapphire Sound", "Emerald Echo", "Amethyst Air", "Golden Gaze", "Silver Shine", "Platinum Pulse", "Bronze Bell", "Copper Chorus", "Iridium Interlude"
        ];

        // Always show the list first
        const status = `*💚KADAYA MD RINGTONE💚*\n\n` +
            `╭━━〔*💚${new Date().getHours() < 12 ? '🌄 සුබ උදෑසනක් 🌄' : '🌛 සුබ රාත්‍රියක් 🌛'}💚*〕━━┈⊷\n` +
            ringtoneList.map((tone, i) => `${i + 1}. ${tone}`).join('\n') +
            `\n╰──────────────┈⊷\n> ⚜️Powered By : ®MR  𝐑𝐀𝐌𝐄𝐒𝐇 💚\n\n` +
            `කැමති රිංටෝන් එක ඩවුන්ලෝඩ් කරගන්න මේකට රිප්ලයි කරලා නම්බර් එක දෙන්න (1-100)!\n` +
            `නැත්නම් .sring <නම> කියලා සර්ච් කරන්න!`;

        await conn.sendMessage(from, {
            image: { url: `https://i.imgur.com/O7IN8mD.jpeg` },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: '⚜️Powered By : 𝐑𝐀𝐌𝐄𝐒𝐇 𝐒𝐀𝐌𝐏𝐀𝐓𝐇 💚',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Handle reply with number
        if (quoted && /^\d+$/.test(body.trim())) {
            const num = parseInt(body.trim()) - 1;
            if (num >= 0 && num < ringtoneList.length) {
                const ringtoneName = ringtoneList[num];
                const { data } = await axios.get(`https://www.dark-yasiya-api.site/download/ringtone?text=${encodeURIComponent(ringtoneName)}`);

                if (!data.status || !data.result || data.result.length === 0) {
                    return reply(`"${ringtoneName}" සඳහා රිංටෝන් එකක් හමු නොවුණා. වෙන එකක් උත්සාහ කරන්න.`);
                }

                const randomRingtone = data.result[Math.floor(Math.random() * data.result.length)];
                await conn.sendMessage(
                    from,
                    {
                        audio: { url: randomRingtone.dl_link },
                        mimetype: "audio/mpeg",
                        fileName: `${randomRingtone.title}.mp3`,
                    },
                    { quoted: mek }
                );
            } else {
                return reply("වලංගු නම්බර් එකක් දෙන්න (1-100 අතර).");
            }
        }

        // Handle search with arguments
        if (args.length > 0) {
            const query = args.join(" ");
            const { data } = await axios.get(`https://www.dark-yasiya-api.site/download/ringtone?text=${encodeURIComponent(query)}`);

            if (!data.status || !data.result || data.result.length === 0) {
                return reply(`"${query}" සඳහා රිංටෝන් එකක් හමු නොවුණා. වෙන යමක් උත්සාහ කරන්න.`);
            }

            const randomRingtone = data.result[Math.floor(Math.random() * data.result.length)];
            await conn.sendMessage(
                from,
                {
                    audio: { url: randomRingtone.dl_link },
                    mimetype: "audio/mpeg",
                    fileName: `${randomRingtone.title}.mp3`,
                },
                { quoted: mek }
            );
        }

    } catch (e) {
        console.error("Error :", e);
        reply(`දෝෂයක් ඇති වුණා: ${e.message}. කරුණාකර පසුව උත්සාහ කරන්න.`);
    }
});