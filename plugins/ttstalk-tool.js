const axios = require("axios");
const { cmd } = require("../command");
const { readEnv } = require('../lib/database');

cmd({
  pattern: "tiktokstalk",
  alias: ["tstalk", "ttstalk"],
  react: "📱",
  desc: "Fetch TikTok user profile details.",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    // Config එකෙන් LANGUAGE කියවනවා
    const env = await readEnv();
    const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

    // භාෂාව අනුව පණිවිඩ
    const messages = {
      sinhala: {
        noUsername: "❎ කරුණාකර TikTok පරිශීලක නමක් ලබා දෙන්න.\n\n*උදාහරණය:* .tiktokstalk mrbeast",
        userNotFound: "❌ පරිශීලකයා හමු නොවීය. කරුණාකර පරිශීලක නම පරීක්ෂා කර නැවත උත්සාහ කරන්න.",
        profileInfo: (user, stats) => `🎭 *TikTok පැතිකඩ සෙවුම්කරු* 🎭

👤 *පරිශීලක නම:* @${user.uniqueId}
📛 *විශේෂ නම:* ${user.nickname}
✅ *සත්‍යාපිතයි:* ${user.verified ? "ඔව් ✅" : "නැත ❌"}
📍 *කලාපය:* ${user.region}
📝 *ජීව දත්ත:* ${user.signature || "ජීව දත්ත නොමැත."}
🔗 *ජීව සබැඳිය:* ${user.bioLink?.link || "සබැඳියක් නොමැත."}

📊 *සංඛ්‍යාලේඛන:*
👥 *අනුගාමිකයින්:* ${stats.followerCount.toLocaleString()}
👤 *අනුගමනය කරනවා:* ${stats.followingCount.toLocaleString()}
❤️ *කැමති:* ${stats.heartCount.toLocaleString()}
🎥 *වීඩියෝ:* ${stats.videoCount.toLocaleString()}

📅 *ගිණුම සෑදුනු දිනය:* ${new Date(user.createTime * 1000).toLocaleDateString()}
🔒 *පුද්ගලික ගිණුම:* ${user.privateAccount ? "ඔව් 🔒" : "නැත 🌍"}

🔗 *පැතිකඩ URL:* https://www.tiktok.com/@${user.uniqueId}
`,
        error: "⚠️ TikTok පැතිකඩ දත්ත ලබා ගැනීමේදී දෝෂයක් ඇති වුණා."
      },
      english: {
        noUsername: "❎ Please provide a TikTok username.\n\n*Example:* .tiktokstalk mrbeast",
        userNotFound: "❌ User not found. Please check the username and try again.",
        profileInfo: (user, stats) => `🎭 *TikTok Profile Stalker* 🎭

👤 *Username:* @${user.uniqueId}
📛 *Nickname:* ${user.nickname}
✅ *Verified:* ${user.verified ? "Yes ✅" : "No ❌"}
📍 *Region:* ${user.region}
📝 *Bio:* ${user.signature || "No bio available."}
🔗 *Bio Link:* ${user.bioLink?.link || "No link available."}

📊 *Statistics:*
👥 *Followers:* ${stats.followerCount.toLocaleString()}
👤 *Following:* ${stats.followingCount.toLocaleString()}
❤️ *Likes:* ${stats.heartCount.toLocaleString()}
🎥 *Videos:* ${stats.videoCount.toLocaleString()}

📅 *Account Created:* ${new Date(user.createTime * 1000).toLocaleDateString()}
🔒 *Private Account:* ${user.privateAccount ? "Yes 🔒" : "No 🌍"}

🔗 *Profile URL:* https://www.tiktok.com/@${user.uniqueId}
`,
        error: "⚠️ An error occurred while fetching TikTok profile data."
      }
    };

    const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

    // Check if username is provided
    if (!q) {
      return reply(msg.noUsername);
    }

    const apiUrl = `https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status) {
      return reply(msg.userNotFound);
    }

    const user = data.data.user;
    const stats = data.data.stats;

    const profileImage = { image: { url: user.avatarLarger }, caption: msg.profileInfo(user, stats) };

    await conn.sendMessage(from, profileImage, { quoted: m });
  } catch (error) {
    console.error("❌ Error in TikTok stalk command:", error);
    const env = await readEnv();
    const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
    const msg = messages[language] || messages.english;
    reply(msg.error);
  }
});
