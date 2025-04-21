const { cmd, commands } = require('../command');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions');
const { updateEnv, readEnv } = require('../lib/database');
const axios = require("axios"); // Added axios for new API

cmd({
    pattern: "epi",
    alias: "episodes",
    desc: "List and download all episodes of a series in order",
    react: "📺",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        // Config එකෙන් LANGUAGE කියවනවා
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        // භාෂාව අනුව පණිවිඩ
        const messages = {
            sinhala: {
                noQuery: "*කරුණාකර කතා මාලාවේ නමක් දෙන්න! (උදා: ගේම් ඔෆ් ත්‍රෝන්ස්)*",
                noEpisodes: "*මෙම කතා මාලාවට අදාළ එපිසෝඩ් හමු වුණේ නැහැ!*",
                noNumberedEpisodes: "*එපිසෝඩ් අංකයන් සහිත වීඩියෝ හමු වුණේ නැහැ!*",
                listHeader: (title) => `╭━━━〔 *හෂි-එම්ඩී* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *${title.toUpperCase()} - මුල සිට අද දක්වා එපිසෝඩ් ලැයිස්තුව*
┃▸└───────────···๏
╰────────────────┈⊷\n\n🔢 ඩවුන්ලෝඩ් කිරීමට අංකයකින් පිළිතුරු දෙන්න\n\n`,
                episodeItem: (ep, index) => `🔢│➪ *[අංකය ${index + 1} - එපිසෝඩ් ${ep.number} ]*\n\n` +
                    `┏━❮💚හෂි විස්තර💚❯━\n` +
                    `┃🤖 *මාතෘකාව :* ${ep.title}\n` +
                    `┃📑 *කාලය :* ${ep.timestamp}\n` +
                    `┃🔖 *නැරඹුම් :* ${ep.views}\n` +
                    `┃📟 *උඩුගත කළේ :* ${ep.ago}\n` +
                    `┗━━━━━━━━━━━━━━𖣔𖣔\n\n`,
                listFooter: "> ඩවුන්ලෝඩ් කිරීමට අංකයකින් පිළිතුරු දෙන්න\n> ⚜️සහය: ®එම්ආර් ලක්සිඳු 💚",
                invalidChoice: "*වැරදි අංකයක්! ලැයිස්තුවේ ඇති අංකයක් තෝරන්න.*",
                downloadOptions: `╭━━━〔 *හෂි-එම්ඩී* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *එපිසෝඩ් ඩවුන්ලෝඩරය*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━〔🔢 *අංකයකින් පිළිතුරු දෙන්න*〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃•1 | ඕඩියෝ බාගත කරන්න 🎧
┃◈┃•2 | ලේඛනයක් ලෙස බාගත කරන්න 📁
┃◈┃•3 | හඬ පණිවිඩයක් ලෙස බාගත කරන්න 🎤
┃◈┃•4 | වීඩියෝ බාගත කරන්න 📽️
┃◈└───────────┈⊷
╰──────────────┈⊷
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`,
                invalidOption: "*වැරදි තේරීමක්! 1-4 අතර තෝරන්න.*",
                videoCaption: (title) => `${title}\n> ⚜️සහය: ®එම්ආර් ලක්සිඳු 💚`,
                docCaption: "> ⚜️සහය: ®එම්ආර් ලක්සිඳු 💚",
                error: (message) => `*දෝෂයක් ඇති වුණා:* ${message}`
            },
            english: {
                noQuery: "*Please provide the name of a series! (e.g., Game of Thrones)*",
                noEpisodes: "*No episodes found for this series!*",
                noNumberedEpisodes: "*No videos with episode numbers found!*",
                listHeader: (title) => `╭━━━〔 *HASHI-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *${title.toUpperCase()} - Episode List from Start to Present*
┃▸└───────────···๏
╰────────────────┈⊷\n\n🔢 Reply with a number to download\n\n`,
                episodeItem: (ep, index) => `🔢│➪ *[Number ${index + 1} - Episode ${ep.number} ]*\n\n` +
                    `┏━❮💚HASHI Details💚❯━\n` +
                    `┃🤖 *Title :* ${ep.title}\n` +
                    `┃📑 *Duration :* ${ep.timestamp}\n` +
                    `┃🔖 *Views :* ${ep.views}\n` +
                    `┃📟 *Uploaded :* ${ep.ago}\n` +
                    `┗━━━━━━━━━━━━━━𖣔𖣔\n\n`,
                listFooter: "> Reply with a number to download\n> ⚜️Powered By: ®MR LAKSIDU 💚",
                invalidChoice: "*Invalid number! Please select a number from the list.*",
                downloadOptions: `╭━━━〔 *HASHI-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *Episode Downloader*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━〔🔢 *Reply with a number*〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃•1 | Download Audio 🎧
┃◈┃•2 | Download as Document 📁
┃◈┃•3 | Download as Voice Message 🎤
┃◈┃•4 | Download Video 📽️
┃◈└───────────┈⊷
╰──────────────┈⊷
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`,
                invalidOption: "*Invalid choice! Please select between 1-4.*",
                videoCaption: (title) => `${title}\n> ⚜️Powered By: ®MR LAKSIDU 💚`,
                docCaption: "> ⚜️Powered By: ®MR LAKSIDU 💚",
                error: (message) => `*An error occurred:* ${message}`
            }
        };

        const msg = messages[language] || messages.english; // Default to English if language not found

        if (!q) return reply(msg.noQuery);

        const searchQuery = `${q} full episodes`;
        const search = await yts(searchQuery);
        let videos = search.videos.filter(video =>
            video.title.toLowerCase().includes("episode") ||
            video.title.toLowerCase().includes("ep")
        );

        if (videos.length === 0) return reply(msg.noEpisodes);

        const episodeList = [];
        videos.forEach(video => {
            const title = video.title.toLowerCase();
            const episodeMatch = title.match(/(?:episode|ep)\s*(\d+)/i);
            if (episodeMatch) {
                const episodeNumber = parseInt(episodeMatch[1]);
                episodeList.push({
                    number: episodeNumber,
                    title: video.title,
                    url: video.url,
                    timestamp: video.timestamp,
                    views: video.views,
                    ago: video.ago,
                    thumbnail: video.thumbnail
                });
            }
        });

        episodeList.sort((a, b) => a.number - b.number);

        if (episodeList.length === 0) return reply(msg.noNumberedEpisodes);

        let listText = msg.listHeader(q);
        episodeList.forEach((ep, index) => {
            listText += msg.episodeItem(ep, index);
        });
        listText += msg.listFooter;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: episodeList[0].thumbnail },
            caption: listText,
            contextInfo: {
                mentionedJid: ['94760698006@s.whatsapp.net'],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363349375266377@newsletter',
                    newsletterName: language === 'sinhala' ? "®එම්ආර් ලක්සිඳු 💚" : "®MR LAKSIDU 💚",
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const replyMek = messageUpdate.messages[0];
            if (!replyMek.message) return;

            const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;
            const isReplyToSentMsg = replyMek.message.extendedTextMessage && replyMek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                const choice = parseInt(messageType) - 1;
                if (isNaN(choice) || choice < 0 || choice >= episodeList.length) {
                    await conn.sendMessage(from, { text: msg.invalidChoice }, { quoted: replyMek });
                    return;
                }

                const selectedEpisode = episodeList[choice];
                const url = selectedEpisode.url;

                const optionMsg = await conn.sendMessage(from, {
                    image: { url: selectedEpisode.thumbnail },
                    caption: msg.downloadOptions,
                    contextInfo: {
                        mentionedJid: ['94760698006@s.whatsapp.net'],
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363349375266377@newsletter',
                            newsletterName: language === 'sinhala' ? "®එම්ආර් ලක්සිඳු 💚" : "®MR LAKSIDU 💚",
                            serverMessageId: 999
                        }
                    }
                }, { quoted: replyMek });

                const optionMsgID = optionMsg.key.id;

                conn.ev.on('messages.upsert', async (optionUpdate) => {
                    const optMek = optionUpdate.messages[0];
                    if (!optMek.message) return;

                    const optType = optMek.message.conversation || optMek.message.extendedTextMessage?.text;
                    const isReplyToOptMsg = optMek.message.extendedTextMessage && optMek.message.extendedTextMessage.contextInfo.stanzaId === optionMsgID;

                    if (isReplyToOptMsg) {
                        await conn.sendMessage(from, { react: { text: '⬇️', key: optMek.key } });

                        let downloadUrl;
                        if (optType === '4') { // Video
                            const videoApiUrl = "https://api.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=" + encodeURIComponent(url);
                            const videoResponse = await axios.get(videoApiUrl);
                            if (!videoResponse.data.success) {
                                return reply(msg.error("Failed to fetch video."));
                            }
                            downloadUrl = videoResponse.data.result.download_url;
                        } else { // Audio, Document, Voice
                            const audioApiUrl = "https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=" + encodeURIComponent(url);
                            const audioResponse = await axios.get(audioApiUrl);
                            if (!audioResponse.data.success) {
                                return reply(msg.error("Failed to fetch audio."));
                            }
                            downloadUrl = audioResponse.data.result.download_url;
                        }

                        await conn.sendMessage(from, { react: { text: '⬆️', key: optMek.key } });

                        if (optType === '1') { // Audio
                            await conn.sendMessage(from, {
                                audio: { url: downloadUrl },
                                mimetype: "audio/mpeg",
                                contextInfo: {
                                    externalAdReply: {
                                        title: selectedEpisode.title,
                                        body: `Episode ${selectedEpisode.number}`,
                                        mediaType: 1,
                                        sourceUrl: url,
                                        thumbnailUrl: selectedEpisode.thumbnail,
                                        renderLargerThumbnail: true,
                                        showAdAttribution: true
                                    }
                                }
                            }, { quoted: optMek });
                        } else if (optType === '2') { // Document
                            await conn.sendMessage(from, {
                                document: { url: downloadUrl },
                                mimetype: "audio/mp3",
                                fileName: `${selectedEpisode.title}.mp3`,
                                caption: msg.docCaption
                            }, { quoted: optMek });
                        } else if (optType === '3') { // Voice
                            await conn.sendMessage(from, {
                                audio: { url: downloadUrl },
                                mimetype: "audio/mpeg",
                                ptt: true,
                                contextInfo: {
                                    externalAdReply: {
                                        title: selectedEpisode.title,
                                        body: `Episode ${selectedEpisode.number}`,
                                        mediaType: 1,
                                        sourceUrl: url,
                                        thumbnailUrl: selectedEpisode.thumbnail,
                                        renderLargerThumbnail: true,
                                        showAdAttribution: true
                                    }
                                }
                            }, { quoted: optMek });
                        } else if (optType === '4') { // Video
                            await conn.sendMessage(from, {
                                video: { url: downloadUrl },
                                mimetype: "video/mp4",
                                caption: msg.videoCaption(selectedEpisode.title),
                                contextInfo: {
                                    externalAdReply: {
                                        title: selectedEpisode.title,
                                        body: `Episode ${selectedEpisode.number}`,
                                        mediaType: 2,
                                        sourceUrl: url,
                                        thumbnailUrl: selectedEpisode.thumbnail,
                                        renderLargerThumbnail: true,
                                        showAdAttribution: true
                                    }
                                }
                            }, { quoted: optMek });
                        } else {
                            await conn.sendMessage(from, { text: msg.invalidOption }, { quoted: optMek });
                        }
                    }
                });
            }
        });
    } catch (e) {
        console.log(e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error(e.message));
    }
});