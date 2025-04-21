const { cmd, commands } = require('../command');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions');

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
    pattern: "yt",
    alias: "ytserach",
    desc: "සින්දු බාගත කිරීමට",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("*කරුණාකර YouTube URL එකක් හෝ සින්දුවේ නමක් දෙන්න!*");

        // YouTube සෙවුම
        const search = await yts(q);
        const videos = search.videos.slice(0, 15); // පළමු වීඩියෝ 15 ගන්නවා

        if (videos.length === 0) return reply("*සින්දු හමු වුණේ නැහැ!*");

        // ලිස්ට් එක සකස් කිරීම
        let listText = `╭━━━〔 *KADAYA-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *YOUTUBE SEARCH RESULTS*
┃▸└───────────···๏
╰────────────────┈⊷\n\n🔢 ℙ𝕝𝕖𝕒𝕤𝕖 𝕣𝕖𝕡𝕝𝕪 𝕨𝕚𝕥𝕙 𝕥𝕙𝕖 𝕟𝕦𝕞𝕓𝕖𝕣 𝕪𝕠𝕦 𝕨𝕒𝕟𝕥\n\n`;
        videos.forEach((video, index) => {
            listText += `🔢│➪ *[REPLY NUMBER ${index + 1} ]*\n\n`;
            listText += `┏━❮🩵KADAYA 𝐃𝐄𝐓𝐀𝐋𝐄𝐒💚❯━\n`;
            listText += `┃🤖 *ᴛɪᴛʟᴇ :* ${video.title}\n`;
            listText += `┃📑 *ᴅᴜʀᴀᴛɪᴏɴ :* ${video.timestamp}\n`;
            listText += `┃🔖 *ᴠɪᴇᴡꜱ :* ${video.views}\n`;
            listText += `┃📟 *ᴜᴘʟᴏᴀᴅ ᴏɴ :* ${video.ago}\n`;
            listText += `┗━━━━━━━━━━━━━━𖣔𖣔\n\n`;
        });
        listText += `>  ℙ𝕝𝕖𝕒𝕤𝕖 𝕣𝕖𝕡𝕝𝕪 𝕨𝕚𝕥𝕙 𝕥𝕙𝕖 𝕟𝕦𝕞𝕓𝕖𝕣 𝕪𝕠𝕦 𝕨𝕒𝕟𝕥\n`;
        listText += `> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌 💚`;

        // ලිස්ට් එක යවනවා
        const sentMsg = await conn.sendMessage(from, {
            image: { url: videos[0].thumbnail },
            caption: listText,
            contextInfo: {
                mentionedJid: ['94760698006@s.whatsapp.net'],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363349375266377@newsletter',
                    newsletterName: "Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌 💚",
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

        const messageID = sentMsg.key.id; // පණිවිඩයේ ID එක සේව් කරනවා

        // පරිශීලකයාගේ රිප්ලයි එක බලනවා
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const replyMek = messageUpdate.messages[0];
            if (!replyMek.message) return;

            const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;
            const isReplyToSentMsg = replyMek.message.extendedTextMessage && replyMek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                const choice = parseInt(messageType) - 1; // අංකය ගන්නවා (1-15 -> 0-14)
                if (isNaN(choice) || choice < 0 || choice >= videos.length) {
                    await conn.sendMessage(from, { text: "*වැරදි අංකයක්! 1-15 අතර තෝරන්න.*" }, { quoted: replyMek });
                    return;
                }

                const selectedVideo = videos[choice];
                const url = selectedVideo.url;

                // ඩවුන්ලෝඩ් විකල්ප පෙන්වනවා
                let desc = `╭━━━〔 *KADAYA-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *YOUTUBE DOWNLOADER*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━〔🔢 *ʀᴇᴘʟʏ ɴᴜᴍʙᴇʀ*〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃•1 | ᴅᴏᴡɴʟᴏᴀᴅ ᴀᴜᴅɪᴏ 🎧
┃◈┃•2 | ᴅᴏᴡɴʟᴏᴀᴅ ᴅᴏᴄᴜᴍᴇɴᴛ  📁
┃◈┃•3 | ᴅᴏᴡɴʟᴏᴀᴅ ᴠᴏɪᴄᴇ 🎤
┃◈└───────────┈⊷
╰──────────────┈⊷
> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌 💚
`;
                let info = `> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌 💚`;

                const optionMsg = await conn.sendMessage(from, {
                    image: { url: selectedVideo.thumbnail },
                    caption: desc,
                    contextInfo: {
                        mentionedJid: ['94760698006@s.whatsapp.net'],
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363349375266377@newsletter',
                            newsletterName: "Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌 💚",
                            serverMessageId: 999
                        }
                    }
                }, { quoted: replyMek });

                const optionMsgID = optionMsg.key.id;

                // ඩවුන්ලෝඩ් විකල්පය තෝරනවා
                conn.ev.on('messages.upsert', async (optionUpdate) => {
                    const optMek = optionUpdate.messages[0];
                    if (!optMek.message) return;

                    const optType = optMek.message.conversation || optMek.message.extendedTextMessage?.text;
                    const isReplyToOptMsg = optMek.message.extendedTextMessage && optMek.message.extendedTextMessage.contextInfo.stanzaId === optionMsgID;

                    if (isReplyToOptMsg) {
                        await conn.sendMessage(from, { react: { text: '⬇️', key: optMek.key } });

                        const down = await fetchJson(`https://apis.davidcyriltech.my.id/download/ytmp3?url=${url}`);
                        const laraDown = down.download.downloadUrl;

                        await conn.sendMessage(from, { react: { text: '⬆️', key: optMek.key } });

                        if (optType === '1') {
                            // ඕඩියෝ
                            await conn.sendMessage(from, {
                                audio: { url: laraDown },
                                mimetype: "audio/mpeg",
                                contextInfo: {
                                    externalAdReply: {
                                        title: selectedVideo.title,
                                        body: selectedVideo.videoId,
                                        mediaType: 1,
                                        sourceUrl: url,
                                        thumbnailUrl: "https://i.imgur.com/ZdEQXYr.jpeg",
                                        renderLargerThumbnail: true,
                                        showAdAttribution: true
                                    }
                                }
                            }, { quoted: optMek });
                        } else if (optType === '2') {
                            // ඩොකියුමන්ට්
                            await conn.sendMessage(from, {
                                document: { url: laraDown },
                                mimetype: "audio/mp3",
                                fileName: `${selectedVideo.title}.mp3`,
                                caption: info
                            }, { quoted: optMek });
                        } else if (optType === '3') {
                            // වොයිස්
                            await conn.sendMessage(from, {
                                audio: { url: laraDown },
                                mimetype: "audio/mpeg",
                                ptt: true,
                                contextInfo: {
                                    externalAdReply: {
                                        title: selectedVideo.title,
                                        body: selectedVideo.videoId,
                                        mediaType: 1,
                                        sourceUrl: url,
                                        thumbnailUrl: "https://i.imgur.com/ZdEQXYr.jpeg",
                                        renderLargerThumbnail: true,
                                        showAdAttribution: true
                                    }
                                }
                            }, { quoted: optMek });
                        } else {
                            await conn.sendMessage(from, { text: "*වැරදි තේරීමක්! 1-3 අතර තෝරන්න.*" }, { quoted: optMek });
                        }

                        // පෙර පණිවිඩය මකනවා
                        
                    }
                });
            }
        });
    } catch (e) {
        console.log(e);
        reply(`*දෝෂයක් ඇති වුණා:* ${e.message}`);
    }
});
