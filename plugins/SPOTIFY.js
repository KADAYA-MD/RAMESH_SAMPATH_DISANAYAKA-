const fetch = require("node-fetch");
const { cmd } = require("../command");

cmd({
  pattern: "spotify",
  alias: ["spotify", "sp"],
  desc: "Search for Spotify tracks using a query.",
  react: '✅',
  category: 'tools',
  filename: __filename
}, async (conn, m, store, {
  from,
  args,
  reply
}) => {
  if (!args[0]) {
    return reply("please give me name or url");
  }

  const query = args.join(" ");
  await store.react('⌛');

  try {
    reply(`🔎 Searching : *${query}*`);
    
    const response = await fetch(`https://api.diioffc.web.id/api/search/spotify?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data || !data.status || !data.result || data.result.length === 0) {
      await store.react('❌');
      return reply("❌ No results found for your query. Please try with a different keyword.");
    }

    // Get up to 7 random results
    const results = data.result.slice(0, 7).sort(() => Math.random() - 0.5);

    for (const track of results) {
      const message = `🎶 *HASHI SPOTIFY RESULT 🎶*:\n\n`
        + `*⚜️ Track Name*: ${track.trackName}\n`
        + `*⚜️ Artist*: ${track.artistName}\n`
        + `*⚜️ Track Number*: ${track.trackNumber}\n`
        + `*⚜️ URL*: ${track.externalUrl}\n\n> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`;

      reply(message);
    }

    await store.react('✅');
  } catch (error) {
    console.error("Error in SpotifySearch command:", error);
    await store.react('❌');
    reply("❌ An error occurred while searching Spotify. Please try again later.");
  }
});
