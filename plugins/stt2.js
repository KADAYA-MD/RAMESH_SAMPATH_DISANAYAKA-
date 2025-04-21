const fetch = require("node-fetch");
const { cmd } = require("../command");
const { readEnv } = require('../lib/database');

cmd({
  pattern: "tiktoksearch2",
  alias: ["rtik2", "tiks2"],
  desc: "Search for TikTok videos using a query.",
  react: '✅',
  category: 'search',
  filename: __filename
}, async (conn, m, store, {
  from,
  args,
  reply
}) => {
  // Config එකෙන් LANGUAGE කියවනවා
  const env = await readEnv();
  const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

  // භාෂාව අනුව පණිවිඩ
  const messages = {
    sinhala: {
      noQuery: "🌸 TikTok හි සෙවීමට ඔබට අවශ්‍ය දේ මොකක්ද?\n\n*භාවිත උදාහරණය:*\n.tiktoksearch <query>",
      searching: (query) => ` TikTok හි සොයමින්: *${query}*`,
      noResults: "❌ ඔබේ සෙවුමට ප්‍රතිඵල හමු වුණේ නැහැ. කරුණාකර වෙනත් keyword එකක් උත්සාහ කරන්න.",
      failedVideo: (title) => `❌ *"${title}"* සඳහා වීඩියෝව ලබා ගැනීමට අපොහොසත් වුණා.`,
      error: "❌ TikTok සෙවීමේදී දෝෂයක් ඇති වුණා. කරුණාකර පසුව උත්සාහ කරන්න."
    },
    english: {
      noQuery: "🌸 What do you want to search on TikTok?\n\n*Usage Example:*\n.tiktoksearch <query>",
      searching: (query) => ` Searching TikTok for: *${query}*`,
      noResults: "❌ No results found for your query. Please try with a different keyword.",
      failedVideo: (title) => `❌ Failed to retrieve video for *"${title}"*.`,
      error: "❌ An error occurred while searching TikTok. Please try again later."
    }
  };

  const msg = messages[language] || messages.english; // භාෂාව ගැලපෙන්න පණිවිඩය තෝරනවා. නැත්නම් English යනවා

  if (!args[0]) {
    return reply(msg.noQuery);
  }

  const query = args.join(" ");
  await store.react('⌛');

  try {
    reply(msg.searching(query));
    
    const response = await fetch(`https://api.diioffc.web.id/api/search/tiktok?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data || !data.status || !data.result || data.result.length === 0) {
      await store.react('❌');
      return reply(msg.noResults);
    }

    // Get up to 7 random results
    const results = data.result.slice(0, 20).sort(() => Math.random() - 0.5);

    for (const video of results) {
      const message = `\n`
        + `*• Title*: ${video.title}\n`;

      if (video.media.no_watermark) {
        await conn.sendMessage(from, {
          video: { url: video.media.no_watermark }, 
          caption: message
        }, { quoted: m });
      } else {
        reply(msg.failedVideo(video.title));
      }
    }

    await store.react('✅');
  } catch (error) {
    console.error("Error in TikTokSearch command:", error);
    await store.react('❌');
    reply(msg.error);
  }
});
