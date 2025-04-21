const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "npmstalk",
    alias: ["npm", "npmpackage"],
    desc: "Get details of an NPM package",
    category: "tools",
    react: "📦",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide an NPM package name.\nExample: `.npm yt search`");

        const apiUrl = `https://api.vreden.my.id/api/npmstalk?query=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.result) {
            await react("❌");
            return reply(`NPM package *${q}* not found.`);
        }

        const result = data.result;
        const repo = result.repository ? result.repository : "Not available";
        const npmUrl = `https://www.npmjs.com/package/${result.name}`;

        const text = `*𝐐𝐔𝐄𝐄𝐍 𝐇𝐀𝐒𝐇𝐈 𝐍𝐏𝐌*\n\n` +
                     `🔰 *ɴᴘᴍ ᴘᴀᴄᴋᴀɢᴇ:* ${result.name}\n` +
                     `📄 *ᴅʀɪꜱᴄʀɪᴘᴛɪᴏɴ:* ${result.description || "No description available"}\n` +
                     `⏸️ *ʟᴀꜱᴛ ᴠᴇʀꜱɪᴏɴ:* ${result["dist-tags"]?.latest || "Unknown"}\n` +
                     `🪪 *ʟɪᴄᴇɴꜱᴇ:* ${result.license || "Unknown"}\n` +
                     `🪩 *ʀᴇᴘᴏꜱɪᴛᴏʀʏ:* ${repo}\n` +
                     `🔗 *ɴᴘᴍ ᴜʀʟ:* ${npmUrl}\n> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`;

        await conn.sendMessage(from, { text }, { quoted: mek });
        await react("✅"); // React after successful response
    } catch (e) {
        console.error("Error in npmstalk command:", e);
        await react("❌");
        reply("An error occurred while fetching NPM package details.");
    }
});
