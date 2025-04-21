const { fetchJson } = require("../lib/functions");
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const { facebook } = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const axios = require("axios");
const { cmd, commands } = require('../command');

cmd({
  pattern: "ig",
  alias: ["insta", "Instagram"],
  desc: "To download Instagram videos.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("❌ Please provide a valid Instagram link.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const response = await axios.get(`https://bk9.fun/download/instagram?url=${encodeURIComponent(q)}`);
    const data = response.data;

    if (!data || data.status !== true || !data.BK9 || data.BK9.length === 0) {
      return reply("⚠️ Failed to fetch Instagram content. Please check the link and try again.");
    }

    // Loop through the BK9 array and send the first video or image found
    for (let item of data.BK9) {
      if (item.type === "video" && item.url) {
        await conn.sendMessage(from, {
          video: { url: item.url },
          mimetype: "video/mp4",
          caption: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
        }, { quoted: m });
        break; // Stop once we send the first video
      } else if (item.type === "image" && item.url) {
        await conn.sendMessage(from, {
          image: { url: item.url },
          caption: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
        }, { quoted: m });
        break; // Stop once we send the first image
      }
    }

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});


cmd({ 'pattern': "tiktok", 'alias': ['tt'], 'react': '🎥', 'desc': "download tt videos", 'category': "download", 'filename': __filename }, async (conn, m, store, { from, quoted, q, reply }) => { try { if (!q || !q.startsWith('https://')) { return reply("Need a valid TikTok URL"); }

store.react('⬇️');

let response = await fetch(`https://bk9.fun/download/tiktok2?url=${encodeURIComponent(q)}`);
let jsonData = await response.json();

if (!jsonData.status) {
  return reply("*Failed to fetch video. Please try again later.*");
}

let tiktokData = jsonData.BK9;
let captionMessage = `

*╭━━〔🐉𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🐉〕━*
*┃▸Title: ${tiktokData.description || 'No title'}*
*╰━━━━━━━━━━━━━━━━━━━━━━*
*╭────────────────────➤*
*┃▸🎥 1. NO WATERMACK* 
*┃▸🔖 2. WITH WATERMARCK* 
*┃▸🎵 3. AUDIO* 
*╰────────────────────➤*
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`;

const sentMessage = await conn.sendMessage(from, {
  'image': { 'url': tiktokData.thumbnail },
  'caption': captionMessage
});

const messageID = sentMessage.key.id;

conn.ev.on("messages.upsert", async message => {
  const receivedMessage = message.messages[0];
  if (!receivedMessage.message) return;

  const userResponse = receivedMessage.message.conversation || receivedMessage.message.extendedTextMessage?.text;
  const chatID = receivedMessage.key.remoteJid;
  const isReplyToBotMessage = receivedMessage.message.extendedTextMessage &&
                              receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === messageID;

  if (isReplyToBotMessage) {
    await conn.sendMessage(chatID, { 'react': { 'text': '⬇️', 'key': receivedMessage.key } });

    let downloadLinks = tiktokData.video;

    if (userResponse === '1') {
      await conn.sendMessage(chatID, {
        'video': { 'url': downloadLinks.noWatermark },
        'caption': "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
      }, { 'quoted': receivedMessage });
    } else if (userResponse === '2') {
      await conn.sendMessage(chatID, {
        'video': { 'url': downloadLinks.withWatermark },
        'caption': "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
      }, { 'quoted': receivedMessage });
    } else if (userResponse === '3') {
      await conn.sendMessage(chatID, {
        'audio': { 'url': tiktokData.audio },
        'mimetype': "audio/mpeg"
      }, { 'quoted': receivedMessage });
    } else {
      reply("*Invalid selection. Please reply with 1, 2, or 3.*");
    }
  }
});

} catch (error) { console.log(error); reply('An error occurred while processing your request.'); } });



// Facebook-dl

cmd({ pattern: "fb", alias: ["facebook"], desc: "Download Facebook videos", category: "download", filename: __filename }, async (conn, m, store, { from, quoted, args, q, reply }) => { try { if (!q || !q.startsWith("https://")) { return conn.sendMessage(from, { text: "Need URL" }, { quoted: m }); }

await conn.sendMessage(from, {
  react: { text: '⏳', key: m.key }
});

const response = await fetch(`https://bk9.fun/download/fb?url=${encodeURIComponent(q)}`);
const fbData = await response.json();

if (!fbData.status) {
  return reply("❌ Error fetching the video. Please try again.");
}

const caption = `╭━〔🐉 *FB DOWNLOADER*🐉 〕━\n`
  + `┃▸ *Title*: ${fbData.BK9.title}\n`
  + `╰━━━━━━━━━\n\n`
  + `🩵 *Download Options:*\n\n`
  + `1  *SD Quality*\n`
  + `2  *HD Quality*\n\n`
  + `🩵 *Audio Options:*\n\n`
  + `3  *Audio (SD)*\n`
  + `4  *Document (MP3)*\n`
  + `5  *Voice (PTT)*\n\n`
  + `🔢 REPLY THE NUMBER.*

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`;

const sentMsg = await conn.sendMessage(from, {
  image: { url: fbData.BK9.thumb },
  caption: caption
}, { quoted: m });

const messageID = sentMsg.key.id;

conn.ev.on("messages.upsert", async (msgData) => {
  const receivedMsg = msgData.messages[0];
  if (!receivedMsg.message) return;
  
  const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
  const senderID = receivedMsg.key.remoteJid;
  const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
  
  if (isReplyToBot) {
    await conn.sendMessage(senderID, {
      react: { text: '⬇️', key: receivedMsg.key }
    });
    
    switch (receivedText) {
      case "1":
        await conn.sendMessage(senderID, {
          video: { url: fbData.BK9.sd },
          caption: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
        }, { quoted: receivedMsg });
        break;

      case "2":
        await conn.sendMessage(senderID, {
          video: { url: fbData.BK9.hd },
          caption: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
        }, { quoted: receivedMsg });
        break;

      case "3":
        await conn.sendMessage(senderID, {
          audio: { url: fbData.BK9.sd },
          mimetype: "audio/mpeg"
        }, { quoted: receivedMsg });
        break;

      case "4":
        await conn.sendMessage(senderID, {
          document: { url: fbData.BK9.sd },
          mimetype: "audio/mpeg",
          fileName: "Facebook_Audio.mp3",
          caption: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
        }, { quoted: receivedMsg });
        break;

      case "5":
        await conn.sendMessage(senderID, {
          audio: { url: fbData.BK9.sd },
          mimetype: "audio/mp4",
          ptt: true
        }, { quoted: receivedMsg });
        break;

      default:
        reply("❌ Invalid option! Please reply with 1, 2, 3, 4, or 5.");
    }
  }
});

} catch (error) { console.error("Error:", error); reply("❌ Error fetching the video. Please try again."); } });



// twitter-dl

cmd({ pattern: "twitter", alias: ["twt", "twdl"], desc: "Download Twitter videos", category: "download", filename: __filename }, async (conn, m, store, { from, quoted, q, reply }) => { try { if (!q || !q.startsWith("https://")) { return conn.sendMessage(from, { text: "❌ Please provide a valid Twitter URL." }, { quoted: m }); }

await conn.sendMessage(from, {
  react: { text: '⏳', key: m.key }
});

const response = await axios.get(`https://bk9.fun/download/twitter-2?url=${q}`);
const data = response.data;

if (!data || !data.status || !data.BK9 || !data.BK9.BK9) {
  return reply("⚠️ Failed to retrieve Twitter video. Please check the link and try again.");
}

const videos = data.BK9.BK9.filter(item => item.type === "video");
if (videos.length === 0) {
  return reply("⚠️ No video found in the provided URL.");
}

const [video1, video2] = videos;

const caption = `╭━━━〔 *TWITTER DOWNLOADER* 〕━━━⊷\n`
  + `┃▸ *Author:* ${data.BK9.authorName} (@${data.BK9.authorUsername})\n`
  + `┃▸ *Likes:* ${data.BK9.likes}\n`
  + `┃▸ *Replies:* ${data.BK9.replies}\n`
  + `┃▸ *Retweets:* ${data.BK9.retweets}\n`
  + `╰━━━⪼\n\n\n`
  + `📹 *Download Options:*\n\n`
  + `1️⃣  *Video 1 (Higher Resolution)*\n\n`
  + `2️⃣  *Video 2 (Lower Resolution)*\n\n\n`
  + `📌 *Reply with the number to download your choice.*`;

const sentMsg = await conn.sendMessage(from, {
  text: caption
}, { quoted: m });

const messageID = sentMsg.key.id;

conn.ev.on("messages.upsert", async (msgData) => {
  const receivedMsg = msgData.messages[0];
  if (!receivedMsg.message) return;

  const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
  const senderID = receivedMsg.key.remoteJid;
  const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

  if (isReplyToBot) {
    await conn.sendMessage(senderID, {
      react: { text: '⬇️', key: receivedMsg.key }
    });

    switch (receivedText) {
      case "1":
        await conn.sendMessage(senderID, {
          video: { url: video1.url },
          caption: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
        }, { quoted: receivedMsg });
        break;

      case "2":
        await conn.sendMessage(senderID, {
          video: { url: video2.url },
          caption: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
        }, { quoted: receivedMsg });
        break;

      default:
        reply("❌ Invalid option! Please reply with 1 or 2.");
    }
  }
});

} catch (error) { console.error("Error:", error); reply("❌ An error occurred while processing your request. Please try again."); } });



// MediaFire-dl

cmd({ pattern: "mediafire", alias: ["mfire"], desc: "To download MediaFire files.", react: "🎥", category: "download", filename: __filename }, async (conn, m, store, { from, quoted, q, reply }) => { try { if (!q) { return reply("❌ Please provide a valid MediaFire link."); }

await conn.sendMessage(from, {
  react: { text: "⏳", key: m.key }
});

const response = await axios.get(`https://bk9.fun/download/mediafire?url=${q}`);
const data = response.data;

if (!data || !data.status || !data.BK9 || !data.BK9.link) {
  return reply("⚠️ Failed to fetch MediaFire download link. Ensure the link is valid and public.");
}

const { link, name, filetype, mime, size } = data.BK9;
const file_name = name || "mediafire_download";
const mime_type = mime || "application/octet-stream";
const file_size = size || "Unknown size";

await conn.sendMessage(from, {
  react: { text: "⬆️", key: m.key }
});

const caption = `╭━━━〔 *MEDIAFIRE DOWNLOADER* 〕━━━⊷\n`
  + `┃▸ *File Name:* ${file_name}\n`
  + `┃▸ *File Type:* ${filetype || "Unknown"}\n`
  + `┃▸ *File Size:* ${file_size}\n`
  + `╰━━━⪼\n\n\n`
  + `📥 *Downloading your file...*`;

await conn.sendMessage(from, {
  document: { url: link },
  mimetype: mime_type,
  fileName: file_name,
  caption: caption
}, { quoted: m });

} catch (error) { console.error("Error:", error); reply("❌ An error occurred while processing your request. Please try again."); } });



// apk-dl

cmd({
  pattern: "apk",
  desc: "Download APK from Aptoide.",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("❌ Please provide an app name to search.");
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.datalist || !data.datalist.list.length) {
      return reply("⚠️ No results found for the given app name.");
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2); // Convert bytes to MB

    const caption = `╭━━━〔 *APK Downloader* 〕━━━┈⊷
┃ 📦 *Name:* ${app.name}
┃ 🏋 *Size:* ${appSize} MB
┃ 📦 *Package:* ${app.package}
┃ 📅 *Updated On:* ${app.updated}
┃ 👨‍💻 *Developer:* ${app.developer.name}
╰━━━━━━━━━━━━━━━┈⊷
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`;

    await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

    await conn.sendMessage(from, {
      document: { url: app.file.path_alt },
      fileName: `${app.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: caption
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while fetching the APK. Please try again.");
  }
});

// G-Drive-DL

cmd({
  pattern: "gdrive",
  desc: "Download Google Drive files.",
  react: "🌐",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid Google Drive link.");
    }

    await conn.sendMessage(from, { react: { text: "⬇️", key: m.key } });

    const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;
    const response = await axios.get(apiUrl);
    const downloadUrl = response.data.result.downloadUrl;

    if (downloadUrl) {
      await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

      await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: response.data.result.mimetype,
        fileName: response.data.result.fileName,
        caption: "*> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
      }, { quoted: m });

      await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
    } else {
      return reply("⚠️ No download URL found. Please check the link and try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while fetching the Google Drive file. Please try again.");
  }
}); 
            
