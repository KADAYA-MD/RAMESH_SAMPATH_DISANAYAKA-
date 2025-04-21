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
    pattern: "csong",
    alias: "play4",
    desc: "To download songs as voice notes.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*`Need YT_URL or Title`*");

        // Convert YouTube link if necessary
        q = convertYouTubeLink(q);

        // Search for the video
        const search = await yts(q);
        const data = search.videos[0];
        if (!data) return reply("*`No results found`*");

        const url = data.url;

        // Send initial message with video details
        let desc = `
┏「🐉𝐇𝐀𝐒𝐇𝐈 𝐀𝐔𝐃𝐈𝐎🐉」
┃ 👨‍💻Owner: 𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔
┃ 🤖 Bot Name: 𝐐𝐔𝐄𝐄𝐍 𝐇𝐀𝐒𝐇𝐈
┗━━━━━━━━━━━━━━━𖣔𖣔
┏━❮ 🩵𝐇𝐀𝐒𝐇𝐈 𝐃𝐄𝐓𝐀𝐋𝐄𝐒🩵 ❯━
┃🤖 *Title:* ${data.title}
┃📑 *Duration:* ${data.timestamp}
┃🔖 *Views:* ${data.views}
┃📟 *Uploaded On:* ${data.ago}
┃👨‍💻 Owner: 𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔
┗━━━━━━━━━━━━━━𖣔𖣔
> ⚜️Downloading as voice note...
> ⚜️Powered By: ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚
`;
        await conn.sendMessage(from, {
            image: { url: data.thumbnail },
            caption: desc,
            contextInfo: {
                mentionedJid: ['94760698006@s.whatsapp.net'],
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363349375266377@newsletter',
                    newsletterName: "®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚",
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

        // Download the audio as MP3
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        const result = await ddownr.download(url, 'mp3');
        const downloadLink = result.downloadUrl;

        // Send the audio as a voice note (PTT)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
        await conn.sendMessage(from, {
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
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("*`Error occurred while downloading`*");
    }
});