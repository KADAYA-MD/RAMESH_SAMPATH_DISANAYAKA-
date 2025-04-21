const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const { readEnv } = require('../lib/database');

cmd({
    pattern: "fetch",
    alias: ["get", "api"],
    desc: "Fetch data from a provided URL or API",
    category: "main",
    react: "🌐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        // Config එකෙන් LANGUAGE කියවනවා
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        // භාෂාව අනුව පණිවිඩ
        const messages = {
            sinhala: {
                noUrl: "❌ කරුණාකර වලංගු URL එකක් හෝ විමසුමක් ලබා දෙන්න.",
                invalidUrl: "❌ URL එක http:// හෝ https:// සමඟ ආරම්භ විය යුතුය.",
                result: (content) => `🔍 *ලබාගත් දත්ත*:\n\`\`\`${content.slice(0, 2048)}\`\`\``,
                error: (e) => `❌ දෝෂයක් ඇති වුණා:\n${e.message}`
            },
            english: {
                noUrl: "❌ Please provide a valid URL or query.",
                invalidUrl: "❌ URL must start with http:// or https://.",
                result: (content) => `🔍 *Fetched Data*:\n\`\`\`${content.slice(0, 2048)}\`\`\``,
                error: (e) => `❌ An error occurred:\n${e.message}`
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

        const q = args.join(' ').trim(); // Extract the URL or API query
        if (!q) return reply(msg.noUrl);

        if (!/^https?:\/\//.test(q)) return reply(msg.invalidUrl);

        const data = await fetchJson(q); // Use your fetchJson utility function to get data
        const content = JSON.stringify(data, null, 2);

        await conn.sendMessage(from, {
            text: msg.result(content),
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardingSourceMessage: language === 'sinhala' ? 'ඔබගේ දත්ත ඉල්ලීම' : 'Your Data Request',
            }
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in fetch command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error(e));
    }
});
