const { cmd } = require('../command');
const axios = require('axios');
const { updateEnv, readEnv } = require('../lib/database');

cmd({
  pattern: "likee",
  alias: ["lkdl", "likee-dl"],
  desc: "To download Likee videos.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    // Config එකෙන් LANGUAGE කියවනවා
    const env = await readEnv();
    const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

    // භාෂාව අනුව පණිවිඩ
    const messages = {
      sinhala: {
        invalidLink: "❌ කරුණාකර වලංගු Likee සබැඳියක් දෙන්න.",
        failedFetch: "⚠️ Likee අන්තර්ගතය ලබා ගැනීමට අපොහොසත් වුණා. කරුණාකර සබැඳිය පරීක්ෂා කර නැවත උත්සාහ කරන්න.",
        successCaption: (title) => `> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚*\n
💚 *මාතෘකාව:* ${title}\n
💚 *ප්‍රමාණය:* ලබා ගත නොහැක`,
        error: "❌ ඔබේ ඉල්ලීම සකසන විට දෝෂයක් ඇති වුණා. කරුණාකර නැවත උත්සාහ කරන්න."
      },
      english: {
        invalidLink: "❌ Please provide a valid Likee link.",
        failedFetch: "⚠️ Failed to fetch Likee content. Please check the link and try again.",
        successCaption: (title) => `> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚*\n
💚 *Title:* ${title}\n
💚 *Size:* Not available`,
        error: "❌ An error occurred while processing your request. Please try again."
      }
    };

    const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

    if (!q || !q.startsWith("http")) {
      return reply(msg.invalidLink);
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    // Modified API call with new endpoint
    const response = await axios.get(`https://bk9.fun/download/likee?url=${encodeURIComponent(q)}`);
    const data = response.data;

    if (!data || data.status !== true || !data.BK9) {
      return reply(msg.failedFetch);
    }

    // Constructing the video download URL based on the API response
    const videoUrl = data.BK9.withoutwatermark; // or `withWatermark` if needed

    // Sending the video
    await conn.sendMessage(from, {
      video: { url: videoUrl },
      mimetype: "video/mp4",
      caption: msg.successCaption(data.BK9.title)
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    const env = await readEnv();
    const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
    const msg = messages[language] || messages.english;
    reply(msg.error);
  }
});
