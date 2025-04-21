const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const { updateEnv, readEnv } = require('../lib/database');

cmd({
    pattern: "about",
    alias: ["laki", "kaudame"],
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
                status: (pushname) => `*👋 ආයුබෝවන් ${pushname}*\n` +
                    `✨⃝⃚⃝⃚__ ආ_පැටියෝ_කොහමද?___⃝⃚⃝⃚💕\n` +
                    `*╔══════✮❁•°♛°•❁✮ ═══════╗*\n` +
                    `*💛❐... @RAMESH_SAMPATH_DISANAYAKA💗ྀི💛*\n` +
                    `*╚══════✮❁•°♛°•❁✮ ═══════╝*\n` +
                    `*❖╭─────────────···▸*\n` +
                    `*❖│▸➤⭕නම - රමේශ්ු🪄🤍*\n` +
                    `*❖│▸➤⭕රට - ශ්‍රී ලංකා*\n` +
                    `*❖│▸➤⭕වයස - xxx❣️*\n` +
                    `*❖│▸➤⭕උපන්දිනය - 06/04✨*\n` +
                    `*❖╰────────────···▸▸*\n` +
                    `*╔══════✮❁•°♛°•❁✮ ═══════╗*\n` +
                    `*❖https://wa.me/+94766002356?text=හායි_ramesh😩⃝⃚💗⃝⃚🍓🪄🤍*\n` +
                    `*╚══════✮❁•°♛°•❁✮ ═══════╝*\n` +
                    `♡ ㅤ      ❍ㅤ      ⎙ㅤ      ⌲\n` +
                    `ˡᶦᵏᵉ     ᶜᵒᵐᵐᵉⁿᵗ     ˢᵃᵛᵉ     ˢʰᵃʳᵉ*\n` +
                    `*╔═════ °❀•°✮°•❀°═══════╗*\n` +
                    `  *┈━═☆  𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 ☆═━┈*\n` +
                    `*╚══════✮❁•°❀°•❁✮══════╝*\n` +
                    `> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  Ramesh_sampath_disanayaka ᶜᵒᵈᵉʳ`,
                error: (e) => `කණගාටුයි, දෝෂයක් ඇති වුණා: ${e.message}`
            },
            english: {
                status: (pushname) => `*👋 HELLO ${pushname}*\n` +
                    `✨⃝⃚⃝⃚__ How are you?___⃝⃚⃝⃚💕\n` +
                    `*╔══════✮❁•°♛°•❁✮ ═══════╗*\n` +
                    `*💛❐... ramesh_sampath_disanayaka💗ྀི💛*\n` +
                    `*╚══════✮❁•°♛°•❁✮ ═══════╝*\n` +
                    `*❖╭─────────────···▸*\n` +
                    `*❖│▸➤⭕Name - RAMESH_SAMPATH_DISANAYAKA🪄🤍*\n` +
                    `*❖│▸➤⭕From - SRI LANKA*\n` +
                    `*❖│▸➤⭕Age - XXXX+❣️*\n` +
                    `*❖│▸➤⭕Birthday - 06/04✨*\n` +
                    `*❖╰────────────···▸▸*\n` +
                    `*╔══════✮❁•°♛°•❁✮ ═══════╗*\n` +
                    `*❖https://wa.me/+94766002356?text=HEY_pkor😩⃝⃚💗⃝⃚🍓🪄🤍*\n` +
                    `*╚══════✮❁•°♛°•❁✮ ═══════╝*\n` +
                    `♡ ㅤ      ❍ㅤ      ⎙ㅤ      ⌲\n` +
                    `ˡᶦᵏᵉ     ᶜᵒᵐᵐᵉⁿᵗ     ˢᵃᵛᵉ     ˢʰᵃʳᵉ*\n` +
                    `*╔═════ °❀•°✮°•❀°═══════╗*\n` +
                    `  *┈━═☆   𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 ☆═━┈*\n` +
                    `*╚══════✮❁•°❀°•❁✮══════╝*\n` +
                    `> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ramesh_sampath_disanayakaᶜᵒᵈᵉʳ`,
                error: (e) => `An error occurred: ${e.message}`
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

        // පණිවිඩය යවනවා
        await conn.sendMessage(from, { 
            image: { url: "https://ibb.co/8DD66xzg" },  // රූප URL
            caption: msg.status(pushname),
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
        console.error("Error in about command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error(e));
    }
});
