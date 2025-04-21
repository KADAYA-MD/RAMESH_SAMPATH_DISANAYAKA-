const { cmd } = require('../command');
const fetch = require('node-fetch');
const { readEnv } = require('../lib/database');

cmd(
  {
    pattern: "tiktoksearch",
    alias: ["stt1", "stt"],
    desc: "Search for TikTok videos and download by selecting a number",
    react: "🎵",
    category: "download",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      // Config එකෙන් LANGUAGE කියවනවා
      const env = await readEnv();
      const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

      // භාෂාව අනුව පණිවිඩ
      const messages = {
        sinhala: {
          noQuery: "❌ *කරුණාකර TikTok සෙවුමට query එකක් දෙන්න!*\n*උදාහරණය:* .tiktoksearch dance",
          noResults: "❌ *සෙවුමට ප්‍රතිඵල හමු වුණේ නැහැ! වෙනත් keyword එකක් උත්සාහ කරන්න.*",
          listHeader: `╭━━━〔 *𝐊𝐀𝐃𝐀𝐘𝐀-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *TIKTOK සෙවුම් ප්‍රතිඵල*
┃▸└───────────···๏
╰────────────────┈⊷\n\n🔢 *කැමති අංකයකට reply කරන්න*\n\n`,
          listFooter: `> *කැමති අංකයකට reply කරන්න (1-40)*\n> ⚜️සාදන ලද්දේ : 𝐑𝐀𝐌𝐄𝐒𝐇 💚`,
          videoDetails: (title) => `┏━❮💚𝐊𝐀𝐃𝐀𝐘𝐀-𝐌𝐃 තොරතුරු💚❯━\n┃💚 *මාතෘකාව :* ${title}\n┗━━━━━━━━━━━━━━𖣔𖣔\n\n`,
          invalidChoice: "❌ *වැරදි අංකයක්! 1-40 අතර තෝරන්න.*",
          noVideoUrl: "❌ *මෙම වීඩියෝව සඳහා ඩවුන්ලෝඩ් link එක හමු වුණේ නැහැ!*",
          videoCaption: (title) => `✅ *TikTok වීඩියෝව බාගත කළා*\n*මාතෘකාව:* ${title}\n> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ 𝐫𝐚𝐦𝐞𝐬𝐡 ᶜᵒᵈᵉʳ`,
          error: (e) => `❌ *දෝෂයක් ඇති වුණා:* ${e.message}`
        },
        english: {
          noQuery: "❌ *Please provide a query for TikTok search!*\n*Example:* .tiktoksearch dance",
          noResults: "❌ *No results found for the search! Try a different keyword.*",
          listHeader: `╭━━━〔 *𝐊𝐀𝐃𝐀𝐘𝐀I-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *TIKTOK SEARCH RESULTS*
┃▸└───────────···๏
╰────────────────┈⊷\n\n🔢 *Please reply with the number you want*\n\n`,
          listFooter: `> *Please reply with the number you want (1-40)*\n> ⚜️Powered By : 𝐑𝐀𝐌𝐄𝐒𝐇 💚`,
          videoDetails: (title) => `┏━❮💚𝐊𝐀𝐃𝐀𝐘𝐀 𝐃𝐄𝐓𝐀𝐈𝐋𝐒💚❯━\n┃💚 *Title :* ${title}\n┗━━━━━━━━━━━━━━𖣔𖣔\n\n`,
          invalidChoice: "❌ *Invalid number! Choose between 1-40.*",
          noVideoUrl: "❌ *No download link found for this video!*",
          videoCaption: (title) => `✅ *TikTok Video Downloaded*\n*Title:* ${title}\n> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʀᴀᴍᴇꜱʜ ᶜᵒᵈᵉʳ`,
          error: (e) => `❌ *An error occurred:* ${e.message}`
        }
      };

      const msg = messages[language] || messages.english; // භාෂාව ගැලපෙන්න පණිවිඩය තෝරනවා. නැත්නම් English යනවා

      if (!args[0]) return reply(msg.noQuery);

      const query = args.join(" ");
      await conn.sendMessage(from, { react: { text: "⌛", key: mek.key } });

      // TikTok search
      const response = await fetch(`https://api.diioffc.web.id/api/search/tiktok?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!data || !data.status || !data.result || data.result.length === 0) {
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
        return reply(msg.noResults);
      }

      // Get up to 40 results
      const videos = data.result.slice(0, 40);

      // Prepare the list
      let listText = msg.listHeader;
      videos.forEach((video, index) => {
        listText += `🔢│➪ *[REPLY NUMBER ${index + 1} ]*\n\n`;
        listText += msg.videoDetails(video.title);
      });
      listText += msg.listFooter;

      // Send the list
      const sentMsg = await conn.sendMessage(from, {
        image: { url: "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg" }, // Default thumbnail
        caption: listText,
      }, { quoted: mek });

      const messageID = sentMsg.key.id;

      // Handle reply (video selection)
      const handleVideoSelection = async (messageUpdate) => {
        const replyMek = messageUpdate.messages[0];
        if (!replyMek.message) return;

        const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;
        const isReplyToSentMsg = replyMek.message.extendedTextMessage && replyMek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

        if (isReplyToSentMsg) {
          const choice = parseInt(messageType) - 1;
          if (isNaN(choice) || choice < 0 || choice >= videos.length) {
            await conn.sendMessage(from, { text: msg.invalidChoice }, { quoted: replyMek });
            return;
          }

          const selectedVideo = videos[choice];
          const videoUrl = selectedVideo.media.no_watermark;

          if (!videoUrl) {
            await conn.sendMessage(from, { text: msg.noVideoUrl }, { quoted: replyMek });
            return;
          }

          // Download and send video
          await conn.sendMessage(from, { react: { text: "⬇️", key: replyMek.key } });

          await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: msg.videoCaption(selectedVideo.title),
          }, { quoted: replyMek });

          await conn.sendMessage(from, { react: { text: "✅", key: replyMek.key } });

          // Cleanup: Remove listener after use
          conn.ev.removeListener('messages.upsert', handleVideoSelection);
        }
      };

      conn.ev.on('messages.upsert', handleVideoSelection);

    } catch (e) {
      console.error("[TIKTOKSEARCH ERROR]", e);
      await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
      reply(msg.error(e));
    }
  }
);
