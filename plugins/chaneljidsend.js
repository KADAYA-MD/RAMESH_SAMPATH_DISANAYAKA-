const { cmd, commands } = require('../command');
const yts = require('yt-search');
const ddownr = require('denethdev-ytmp3');

// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

cmd({
    pattern: "csend",
    alias: "play4",
    desc: "To download songs as voice notes and send to a specific WhatsApp JID or newsletter.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*`Need song title/URL and WhatsApp JID`* \nExample: .csong Believer 120363349375266377@newsletter");

        // Split query into song title/URL and JID
        const parts = q.split(' ');
        if (parts.length < 2) return reply("*`Please provide both song title/URL and JID`* \nExample: .csong Believer 120363349375266377@newsletter");

        const jid = parts.pop(); // Last part is the JID
        const songQuery = parts.join(' '); // Rest is the song title or URL

        // Validate JID format (supports personal, group, and newsletter)
        if (!jid.includes('@s.whatsapp.net') && !jid.includes('@g.us') && !jid.includes('@newsletter')) {
            return reply("*`Invalid JID format. Use a valid WhatsApp JID (e.g., @1234567890@s.whatsapp.net, @1234567890@g.us, or 120363349375266377@newsletter)`*");
        }

        // Convert YouTube link if necessary
        const query = convertYouTubeLink(songQuery);

        // Search for the video
        const search = await yts(query);
        const data = search.videos[0];
        if (!data) return reply("*`No results found`*");

        const url = data.url;

        // Send initial message with video details to the specified JID
        let desc = `
┏「🐉𝐇𝐀𝐒𝐇𝐈 𝐀𝐔𝐃𝐈𝐎🐉」
┃ 👨‍💻Owner: 𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔
┃ 🤖 Bot Name: 𝐐𝐔𝐄𝐄𝐍 𝐇𝐀𝐒𝐇𝐈
┗━━━━━━━━━━━━━━━𖣔𖣔
┏━❮ 🩵𝐇𝐀𝐒𝐇𝐈 𝐃𝐄𝐓𝐀𝐈𝐋𝐒🩵 ❯━
┃🤖 *Title:* ${data.title}
┃📑 *Duration:* ${data.timestamp}
┃🔖 *Views:* ${data.views}
┃📟 *Uploaded On:* ${data.ago}
┃👨‍💻 Owner: 𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔
┗━━━━━━━━━━━━━━𖣔𖣔
> ⚜️Downloading as voice note...
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;
        await conn.sendMessage(jid, {
            image: { url: data.thumbnail },
            caption: desc,
            contextInfo: {
                mentionedJid: ['94760698006@s.whatsapp.net'],
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363349375266377@newsletter',
                    newsletterName: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ",
                    serverMessageId: 999
                }
            }
        }, { quoted: null });

        // Download the audio as MP3
        await conn.sendMessage(jid, { react: { text: '⬇️', key: { remoteJid: jid, fromMe: true, id: mek.key.id } } });
        const result = await ddownr.download(url, 'mp3');
        const downloadLink = result.downloadUrl;

        // Send the audio as a voice note (PTT) to the specified JID
        await conn.sendMessage(jid, { react: { text: '⬆️', key: { remoteJid: jid, fromMe: true, id: mek.key.id } } });
        await conn.sendMessage(jid, {
            audio: { url: downloadLink },
            mimetype: "audio/mpeg",
            ptt: true,
            contextInfo: {
                externalAdReply: {
                    title: data.title,
                    body: data.videoId,
                    mediaType: 1,
                    sourceUrl: data.url,
                    thumbnailUrl: data.thumbnail,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: null });

        // Notify the sender that the song was sent
        await reply(`*🤖Song "${data.title}" was successfully sent to ${jid} as a voice note!*\n\n> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`);

    } catch (e) {
        console.error(e);
        reply("*`Error occurred while downloading or sending`* \nDetails: " + e.message);
    }
});
