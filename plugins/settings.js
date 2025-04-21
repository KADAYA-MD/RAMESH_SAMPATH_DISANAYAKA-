const { updateEnv, readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const EnvVar = require('../lib/mongodbenv');

cmd({
    pattern: "settings",
    alias: ["setting", "set"],
    desc: "View and manage bot settings.",
    category: "main",
    react: "⚙️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply("🙇‍♂️ *You don’t have permission to perform this action.*");

        const config = await readEnv();

        // Work Mode Display
        let work;
        switch (config.MODE) {
            case 'public':
                work = '🌍 Public';
                break;
            case 'private':
                work = '🔒 Private';
                break;
            case 'groups':
                work = '👥 Groups Only';
                break;
            case 'inbox':
                work = '📨 Inbox Only';
                break;
            default:
                work = '⚠️ Unknown';
        }

        // Boolean settings display
        const status = (value) => value === 'true' ? '🟢 ON' : '🔴 OFF';
        let autoReadStatus = status(config.AUTO_READ_STATUS);
        let autoVoice = status(config.AUTO_VOICE);
        let autoReact = status(config.AUTO_REACT);
        let fakeRecording = status(config.FAKE_RECORDING);
        let autoTyping = status(config.AUTO_TYPING);
        let antiLink = status(config.ANTI_LINK);
        let autoReply = status(config.AUTO_REPLY);
        let antiBad = status(config.ANTI_BAD);
        let readMessage = status(config.READ_MESSAGE);
        let alwaysOnline = status(config.ALWAYS_ONLINE);
        let antiDelete = status(config.ANTI_DELETE);
        let inboxBlock = status(config.INBOX_BLOCK);
        let antiBot = status(config.ANTI_BOT);
        let autoTikTok = status(config.AUTO_TIKTOK);
        let autoNewsEnabled = status(config.AUTO_NEWS_ENABLED);
        let sendStartNews = status(config.SEND_START_NEWS);

        // Send settings menu with enhanced caption
        const vv = await conn.sendMessage(from, {
            image: { url: 'https://i.ibb.co/M5p9dt2d/6514c455419b2a6c.jpg' },
            caption: `
╭─✨ *BOT CONTROL CENTER* ✨─╮
│ 🎮 *Customize Your Bot Experience!* 🎮
╰───────────────────╯

🌟 *CURRENT SETTINGS* 🌟
╭───────────────────╮
│ ⚙️ *Mode*        ➜ ${work}
│ 🔑 *Prefix*      ➜ *${config.PREFIX || '.'}*
│ 🌐 *Language*    ➜ *${config.LANGUAGE || 'sinhala'}*
│ 📊 *Auto Read Status* ➜ ${autoReadStatus}
│ 🎙️ *Auto Voice*  ➜ ${autoVoice}
│ 😄 *Auto React*  ➜ ${autoReact}
│ 🎥 *Fake Recording* ➜ ${fakeRecording}
│ ⌨️ *Auto Typing* ➜ ${autoTyping}
│ 🔗 *Anti Link*   ➜ ${antiLink}
│ 💬 *Auto Reply*  ➜ ${autoReply}
│ 🚫 *Anti Bad Words* ➜ ${antiBad}
│ ✅ *Read Message* ➜ ${readMessage}
│ 🌙 *Always Online* ➜ ${alwaysOnline}
│ 🗑️ *Anti Delete* ➜ ${antiDelete}
│ 📥 *Inbox Block* ➜ ${inboxBlock}
│ 🤖 *Anti Bot*    ➜ ${antiBot}
│ 🎵 *Auto TikTok* ➜ ${autoTikTok}
│ 📰 *Auto News*   ➜ ${autoNewsEnabled}
│ 📢 *Start News*  ➜ ${sendStartNews}
│ 👥 *News Group*  ➜ *${config.AUTO_NEWS_GROUP_JID || 'Not Set'}*
│ 📹 *TikTok JID*  ➜ *${config.AUTO_TIKTOK_JID || 'Not Set'}*
│ 📤 *Delete Msg To* ➜ *${config.DELETEMSGSENDTO || 'Not Set'}*
│ 🖼️ *Start Photo* ➜ *${config.START_PHOTO_URL || 'Not Set'}*
│ 🖥️ *Alive Image* ➜ *${config.ALIVE_IMG || 'Not Set'}*
╰───────────────────╯

🔧 *𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒 𝐏𝐀𝐍𝐍𝐄𝐋 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃* 🔧
╭───────────────────╮
📌 *[1] Work Mode*
   1.1 | 🌍 Set Public
   1.2 | 🔒 Set Private
   1.3 | 👥 Set Groups Only
   1.4 | 📨 Set Inbox Only

📌 *[2] Prefix*
   2.1 | 🔑 Set Prefix (e.g., .updateenv PREFIX: !)

📌 *[3] Language*
   3.1 | 🇬🇧 Set English
   3.2 | 🇱🇰 Set Sinhala

📌 *[4] Auto Read Status*
   4.1 | 🟢 ON
   4.2 | 🔴 OFF

📌 *[5] Auto Voice*
   5.1 | 🟢 ON
   5.2 | 🔴 OFF

📌 *[6] Auto React*
   6.1 | 🟢 ON
   6.2 | 🔴 OFF

📌 *[7] Fake Recording*
   7.1 | 🟢 Enable
   7.2 | 🔴 Disable

📌 *[8] Auto Typing*
   8.1 | 🟢 Enable
   8.2 | 🔴 Disable

📌 *[9] Anti Link*
   9.1 | 🟢 Enable
   9.2 | 🔴 Disable

📌 *[10] Auto Reply*
   10.1 | 🟢 Enable
   10.2 | 🔴 Disable

📌 *[11] Anti Bad Words*
   11.1 | 🟢 Enable
   11.2 | 🔴 Disable

📌 *[12] Read Message*
   12.1 | 🟢 Enable
   12.2 | 🔴 Disable

📌 *[13] Always Online*
   13.1 | 🟢 Enable
   13.2 | 🔴 Disable

📌 *[14] Anti Delete*
   14.1 | 🟢 Enable
   14.2 | 🔴 Disable

📌 *[15] Inbox Block*
   15.1 | 🟢 Enable
   15.2 | 🔴 Disable

📌 *[16] Anti Bot*
   16.1 | 🟢 Enable
   16.2 | 🔴 Disable

📌 *[17] Auto TikTok*
   17.1 | 🟢 Enable
   17.2 | 🔴 Disable

📌 *[18] Auto News*
   18.1 | 🟢 Enable
   18.2 | 🔴 Disable

📌 *[19] Send Start News*
   19.1 | 🟢 Enable
   19.2 | 🔴 Disable

📌 *[20] News Group JID*
   20.1 | 👥 Set JID (e.g., .updateenv AUTO_NEWS_GROUP_JID: 120363417453798885@g.us)

📌 *[21] TikTok JID*
   21.1 | 📹 Set JID (e.g., .updateenv AUTO_TIKTOK_JID: 120363417453798885@g.us)

📌 *[22] Delete Msg To*
   22.1 | 📤 Set JID (e.g., .updateenv DELETEMSGSENDTO: 123456789@s.whatsapp.net)

📌 *[23] Start Photo*
   23.1 | 🖼️ Set URL (e.g., .updateenv START_PHOTO_URL: https://example.com/image.jpg)

📌 *[24] Alive Image*
   24.1 | 🖥️ Set URL (e.g., .updateenv ALIVE_IMG: https://i.ibb.co/M5p9dt2d/6514c455419b2a6c.jpg)
╰───────────────────╯

💡 *Reply with an option number to tweak your bot!*
╭────────────────────╮
│ Ｋ   Ａ   Ｄ   Ａ   Ｙ   Ａ




T H E 


N O O B 


H A C K E R
╰────────────────────╯
`
        }, { quoted: mek });

        // Event listener for user response (unchanged)
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        await reply(".updateenv MODE: public");
                        break;
                    case '1.2':
                        await reply(".updateenv MODE: private");
                        break;
                    case '1.3':
                        await reply(".updateenv MODE: groups");
                        break;
                    case '1.4':
                        await reply(".updateenv MODE: inbox");
                        break;
                    case '2.1':
                        await reply("Please use: .updateenv PREFIX: [new_prefix] (e.g., .updateenv PREFIX: !)");
                        break;
                    case '3.1':
                        await reply(".updateenv LANGUAGE: english");
                        break;
                    case '3.2':
                        await reply(".updateenv LANGUAGE: sinhala");
                        break;
                    case '4.1':
                        await reply(".updateenv AUTO_READ_STATUS: true");
                        break;
                    case '4.2':
                        await reply(".updateenv AUTO_READ_STATUS: false");
                        break;
                    case '5.1':
                        await reply(".updateenv AUTO_VOICE: true");
                        break;
                    case '5.2':
                        await reply(".updateenv AUTO_VOICE: false");
                        break;
                    case '6.1':
                        await reply(".updateenv AUTO_REACT: true");
                        break;
                    case '6.2':
                        await reply(".updateenv AUTO_REACT: false");
                        break;
                    case '7.1':
                        await reply(".updateenv FAKE_RECORDING: true");
                        break;
                    case '7.2':
                        await reply(".updateenv FAKE_RECORDING: false");
                        break;
                    case '8.1':
                        await reply(".updateenv AUTO_TYPING: true");
                        break;
                    case '8.2':
                        await reply(".updateenv AUTO_TYPING: false");
                        break;
                    case '9.1':
                        await reply(".updateenv ANTI_LINK: true");
                        break;
                    case '9.2':
                        await reply(".updateenv ANTI_LINK: false");
                        break;
                    case '10.1':
                        await reply(".updateenv AUTO_REPLY: true");
                        break;
                    case '10.2':
                        await reply(".updateenv AUTO_REPLY: false");
                        break;
                    case '11.1':
                        await reply(".updateenv ANTI_BAD: true");
                        break;
                    case '11.2':
                        await reply(".updateenv ANTI_BAD: false");
                        break;
                    case '12.1':
                        await reply(".updateenv READ_MESSAGE: true");
                        break;
                    case '12.2':
                        await reply(".updateenv READ_MESSAGE: false");
                        break;
                    case '13.1':
                        await reply(".updateenv ALWAYS_ONLINE: true");
                        break;
                    case '13.2':
                        await reply(".updateenv ALWAYS_ONLINE: false");
                        break;
                    case '14.1':
                        await reply(".updateenv ANTI_DELETE: true");
                        break;
                    case '14.2':
                        await reply(".updateenv ANTI_DELETE: false");
                        break;
                    case '15.1':
                        await reply(".updateenv INBOX_BLOCK: true");
                        break;
                    case '15.2':
                        await reply(".updateenv INBOX_BLOCK: false");
                        break;
                    case '16.1':
                        await reply(".updateenv ANTI_BOT: true");
                        break;
                    case '16.2':
                        await reply(".updateenv ANTI_BOT: false");
                        break;
                    case '17.1':
                        await reply(".updateenv AUTO_TIKTOK: true");
                        break;
                    case '17.2':
                        await reply(".updateenv AUTO_TIKTOK: false");
                        break;
                    case '18.1':
                        await reply(".updateenv AUTO_NEWS_ENABLED: true");
                        break;
                    case '18.2':
                        await reply(".updateenv AUTO_NEWS_ENABLED: false");
                        break;
                    case '19.1':
                        await reply(".updateenv SEND_START_NEWS: true");
                        break;
                    case '19.2':
                        await reply(".updateenv SEND_START_NEWS: false");
                        break;
                    case '20.1':
                        await reply("Please use: .updateenv AUTO_NEWS_GROUP_JID: [new_jid]");
                        break;
                    case '21.1':
                        await reply("Please use: .updateenv AUTO_TIKTOK_JID: [new_jid]");
                        break;
                    case '22.1':
                        await reply("Please use: .updateenv DELETEMSGSENDTO: [new_jid]");
                        break;
                    case '23.1':
                        await reply("Please use: .updateenv START_PHOTO_URL: [new_url]");
                        break;
                    case '24.1':
                        await reply("Please use: .updateenv ALIVE_IMG: [new_url]");
                        break;
                    default:
                        await reply("Invalid option. Please select a valid option🔴");
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
});