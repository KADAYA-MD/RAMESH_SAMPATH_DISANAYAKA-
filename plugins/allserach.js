const { cmd } = require('../command');
const yts = require('yt-search');
const fetch = require('node-fetch');
const g_i_s = require('g-i-s');
const { fetchJson } = require('../lib/functions');
const { updateEnv, readEnv } = require('../lib/database');

cmd({
    pattern: "all",
    alias: ["allsearch"],
    desc: "Search YouTube, TikTok, or Images based on user choice",
    react: "🔍",
    category: "search",
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
                noQuery: "*කරුණාකර සෙවුමට query එකක් දෙන්න!*",
                choiceText: `╭━━━〔 *HASHI-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *සෙවුම් විකල්ප*
┃▸└───────────···๏
╰────────────────┈⊷\n\n🔢 *කරුණාකර අංකයකින් පිළිතුරු දෙන්න*\n\n` +
                    `┏━❮💚එකක් තෝරන්න💚❯━\n` +
                    `┃1️⃣ *YouTube* 🎵\n` +
                    `┃2️⃣ *TikTok* 🎥\n` +
                    `┃3️⃣ *රූප* 🖼️\n` +
                    `┗━━━━━━━━━━━━━━𖣔𖣔\n\n` +
                    `> *1, 2, හෝ 3 ලෙස පිළිතුරු දෙන්න*\n` +
                    `> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`,
                invalidChoice: "*වැරදි තේරීමක්! 1-3 අතර තෝරන්න.*",
                noResults: "*කිසිම ප්‍රතිඵලයක් හමු වුණේ නැහැ!*",
                resultText: (platform) => `╭━━━〔 *HASHI-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *${platform.toUpperCase()} සෙවුම් ප්‍රතිඵල*
┃▸└───────────···๏
╰────────────────┈⊷\n\n🔢 *කරුණාකර අංකයකින් පිළිතුරු දෙන්න*\n\n`,
                youtubeResult: (video, index) => `🔢│➪ *[අංකය ${index + 1} පිළිතුරු දෙන්න]*\n\n` +
                    `┏━❮💚𝐘𝐎𝐔𝐓𝐔𝐁𝐄💚❯━\n` +
                    `┃🤖 *මාතෘකාව :* ${video.title}\n` +
                    `┃📑 *කාලය :* ${video.timestamp}\n` +
                    `┗━━━━━━━━━━━━━━𖣔𖣔\n\n`,
                tiktokResult: (video, index) => `🔢│➪ *[අංකය ${index + 1} පිළිතුරු දෙන්න]*\n\n` +
                    `┏━❮💚𝐓𝐈𝐊𝐓𝐎𝐊💚❯━\n` +
                    `┃💚 *මාතෘකාව :* ${video.title}\n` +
                    `┗━━━━━━━━━━━━━━𖣔𖣔\n\n`,
                imageResult: (img, index) => `🔢│➪ *[අංකය ${index + 1} පිළිතුරු දෙන්න]*\n\n` +
                    `┏━❮💚රූප💚❯━\n` +
                    `┃🖼️ *URL :* ${img.url}\n` +
                    `┗━━━━━━━━━━━━━━𖣔𖣔\n\n`,
                invalidNumber: (max) => `*වැරදි අංකයක්! 1-${max} අතර තෝරන්න.*`,
                youtubeOptions: `╭━━━〔 *HASHI-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *YOUTUBE බාගත කිරීම*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━〔🔢 *අංකයකින් පිළිතුරු දෙන්න*〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃•1 | බාගත කරන්න හඬ 🎧
┃◈┃•2 | බාගත කරන්න ලේඛනය  📁
┃◈┃•3 | බාගත කරන්න හඬ පණිවිඩය 🎤
┃◈└───────────┈⊷
╰──────────────┈⊷
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`,
                invalidDownloadOption: "*වැරදි තේරීමක්! 1-3 අතර තෝරන්න.*",
                tiktokSuccess: (title) => `✅ *TikTok වීඩියෝ*\n*මාතෘකාව:* ${title}`,
                imageSuccess: "✅ *රූපය බාගත කරන ලදි*",
                error: (message) => `*දෝෂයක් ඇති වුණා:* ${message}`
            },
            english: {
                noQuery: "*Please provide a query for the search!*",
                choiceText: `╭━━━〔 *HASHI-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *SEARCH OPTIONS*
┃▸└───────────···๏
╰────────────────┈⊷\n\n🔢 *Please reply with the number*\n\n` +
                    `┏━❮💚𝐂𝐇𝐎𝐎𝐒𝐄 𝐎𝐍𝐄💚❯━\n` +
                    `┃1️⃣ *YouTube* 🎵\n` +
                    `┃2️⃣ *TikTok* 🎥\n` +
                    `┃3️⃣ *Images* 🖼️\n` +
                    `┗━━━━━━━━━━━━━━𖣔𖣔\n\n` +
                    `> *Reply with 1, 2, or 3*\n` +
                    `> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`,
                invalidChoice: "*Invalid choice! Please select between 1-3.*",
                noResults: "*No results found!*",
                resultText: (platform) => `╭━━━〔 *HASHI-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *${platform.toUpperCase()} SEARCH RESULTS*
┃▸└───────────···๏
╰────────────────┈⊷\n\n🔢 *Please reply with the number*\n\n`,
                youtubeResult: (video, index) => `🔢│➪ *[REPLY NUMBER ${index + 1} ]*\n\n` +
                    `┏━❮💚𝐘𝐎𝐔𝐓𝐔𝐁𝐄💚❯━\n` +
                    `┃🤖 *Title :* ${video.title}\n` +
                    `┃📑 *Duration :* ${video.timestamp}\n` +
                    `┗━━━━━━━━━━━━━━𖣔𖣔\n\n`,
                tiktokResult: (video, index) => `🔢│➪ *[REPLY NUMBER ${index + 1} ]*\n\n` +
                    `┏━❮💚𝐓𝐈𝐊𝐓𝐎𝐊💚❯━\n` +
                    `┃💚 *Title :* ${video.title}\n` +
                    `┗━━━━━━━━━━━━━━𖣔𖣔\n\n`,
                imageResult: (img, index) => `🔢│➪ *[REPLY NUMBER ${index + 1} ]*\n\n` +
                    `┏━❮💚𝐈𝐌𝐀𝐆𝐄💚❯━\n` +
                    `┃🖼️ *URL :* ${img.url}\n` +
                    `┗━━━━━━━━━━━━━━𖣔𖣔\n\n`,
                invalidNumber: (max) => `*Invalid number! Please select between 1-${max}.*`,
                youtubeOptions: `╭━━━〔 *HASHI-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *YOUTUBE DOWNLOADER*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━〔🔢 *Reply number*〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃•1 | Download Audio 🎧
┃◈┃•2 | Download Document  📁
┃◈┃•3 | Download Voice 🎤
┃◈└───────────┈⊷
╰──────────────┈⊷
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`,
                invalidDownloadOption: "*Invalid choice! Please select between 1-3.*",
                tiktokSuccess: (title) => `✅ *TikTok Video*\n*Title:* ${title}`,
                imageSuccess: "✅ *Image Downloaded*",
                error: (message) => `*An error occurred:* ${message}`
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

        if (!q) return reply(msg.noQuery);

        // Initial choice message
        const choiceMsg = await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg" },
            caption: msg.choiceText
        }, { quoted: mek });

        const choiceMsgID = choiceMsg.key.id;

        // Handle the platform choice
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const replyMek = messageUpdate.messages[0];
            if (!replyMek.message) return;

            const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;
            const isReplyToChoiceMsg = replyMek.message.extendedTextMessage && replyMek.message.extendedTextMessage.contextInfo.stanzaId === choiceMsgID;

            if (isReplyToChoiceMsg) {
                let platform;
                if (messageType === '1') platform = 'youtube';
                else if (messageType === '2') platform = 'tiktok';
                else if (messageType === '3') platform = 'image';
                else {
                    await conn.sendMessage(from, { text: msg.invalidChoice }, { quoted: replyMek });
                    return;
                }

                await conn.sendMessage(from, { react: { text: "⌛", key: replyMek.key } });

                let listText = msg.resultText(platform);
                let results = [];

                // Search based on platform
                if (platform === 'youtube') {
                    const ytSearch = await yts(q);
                    const ytVideos = ytSearch.videos.slice(0, 10); // Top 10 YouTube results
                    ytVideos.forEach((video, index) => {
                        listText += msg.youtubeResult(video, index);
                        results.push(video);
                    });
                } else if (platform === 'tiktok') {
                    const ttResponse = await fetch(`https://api.diioffc.web.id/api/search/tiktok?query=${encodeURIComponent(q)}`);
                    const ttData = await ttResponse.json();
                    const ttVideos = ttData.result ? ttData.result.slice(0, 10) : [];
                    ttVideos.forEach((video, index) => {
                        listText += msg.tiktokResult(video, index);
                        results.push(video);
                    });
                } else if (platform === 'image') {
                    await new Promise((resolve) => {
                        g_i_s(q, (error, result) => {
                            if (!error && result.length) {
                                const imgResults = result.slice(0, 10); // Top 10 images
                                imgResults.forEach((img, index) => {
                                    listText += msg.imageResult(img, index);
                                    results.push(img);
                                });
                            }
                            resolve();
                        });
                    });
                }

                if (results.length === 0) {
                    await conn.sendMessage(from, { text: msg.noResults }, { quoted: replyMek });
                    return;
                }

                listText += `> *Reply with a number (1-${results.length})*\n`;
                listText += `> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚`;

                const resultMsg = await conn.sendMessage(from, {
                    image: { url: results[0]?.thumbnail || results[0]?.media?.thumbnail || results[0]?.url || "https://i.imgur.com/ZdEQXYr.jpeg" },
                    caption: listText
                }, { quoted: replyMek });

                const resultMsgID = resultMsg.key.id;

                // Handle the selection
                conn.ev.on('messages.upsert', async (selectionUpdate) => {
                    const selMek = selectionUpdate.messages[0];
                    if (!selMek.message) return;

                    const selType = selMek.message.conversation || selMek.message.extendedTextMessage?.text;
                    const isReplyToResultMsg = selMek.message.extendedTextMessage && selMek.message.extendedTextMessage.contextInfo.stanzaId === resultMsgID;

                    if (isReplyToResultMsg) {
                        const choice = parseInt(selType) - 1;
                        if (isNaN(choice) || choice < 0 || choice >= results.length) {
                            await conn.sendMessage(from, { text: msg.invalidNumber(results.length) }, { quoted: selMek });
                            return;
                        }

                        const selected = results[choice];

                        if (platform === 'youtube') {
                            const optionMsg = await conn.sendMessage(from, {
                                image: { url: selected.thumbnail },
                                caption: msg.youtubeOptions
                            }, { quoted: selMek });

                            const optionMsgID = optionMsg.key.id;

                            conn.ev.on('messages.upsert', async (optionUpdate) => {
                                const optMek = optionUpdate.messages[0];
                                if (!optMek.message) return;

                                const optType = optMek.message.conversation || optMek.message.extendedTextMessage?.text;
                                const isReplyToOptMsg = optMek.message.extendedTextMessage && optMek.message.extendedTextMessage.contextInfo.stanzaId === optionMsgID;

                                if (isReplyToOptMsg) {
                                    await conn.sendMessage(from, { react: { text: '⬇️', key: optMek.key } });
                                    const down = await fetchJson(`https://apis.davidcyriltech.my.id/download/ytmp3?url=${selected.url}`);
                                    const laraDown = down.download.downloadUrl;
                                    await conn.sendMessage(from, { react: { text: '⬆️', key: optMek.key } });

                                    if (optType === '1') {
                                        await conn.sendMessage(from, { audio: { url: laraDown }, mimetype: "audio/mpeg" }, { quoted: optMek });
                                    } else if (optType === '2') {
                                        await conn.sendMessage(from, { document: { url: laraDown }, mimetype: "audio/mp3", fileName: `${selected.title}.mp3` }, { quoted: optMek });
                                    } else if (optType === '3') {
                                        await conn.sendMessage(from, { audio: { url: laraDown }, mimetype: "audio/mpeg", ptt: true }, { quoted: optMek });
                                    } else {
                                        await conn.sendMessage(from, { text: msg.invalidDownloadOption }, { quoted: optMek });
                                    }
                                }
                            });
                        } else if (platform === 'tiktok') {
                            await conn.sendMessage(from, { react: { text: "⬇️", key: selMek.key } });
                            await conn.sendMessage(from, {
                                video: { url: selected.media.no_watermark },
                                caption: msg.tiktokSuccess(selected.title)
                            }, { quoted: selMek });
                            await conn.sendMessage(from, { react: { text: "✅", key: selMek.key } });
                        } else if (platform === 'image') {
                            await conn.sendMessage(from, { image: { url: selected.url }, caption: msg.imageSuccess }, { quoted: selMek });
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
