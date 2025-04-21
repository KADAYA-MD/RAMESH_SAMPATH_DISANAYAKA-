const { cmd } = require('../command');
const config = require('../config');
const { updateEnv, readEnv } = require('../lib/database');

let autoBioInterval;

cmd({
    pattern: "setbio",
    desc: "Enable or disable the AutoBIO feature.",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    // Config එකෙන් LANGUAGE කියවනවා
    const env = await readEnv();
    const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

    // භාෂාව අනුව පණිවිඩ
    const messages = {
        sinhala: {
            notOwner: "❌ ඔබ හිමිකරු නොවේ!",
            enabled: "👨‍💻 AutoBIO විශේෂාංගය *සක්‍රිය කර ඇත*! 🔄",
            disabled: "👨‍💻 AutoBIO විශේෂාංගය *අක්‍රිය කර ඇත*! 🚫"
        },
        english: {
            notOwner: "❌ You are not the owner!",
            enabled: "👨‍💻 AutoBIO feature has been *enabled*! 🔄",
            disabled: "👨‍💻 AutoBIO feature has been *disabled*! 🚫"
        }
    };

    const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

    if (!isOwner) return reply(msg.notOwner);

    config.autoBioEnabled = !config.autoBioEnabled;

    if (config.autoBioEnabled) {
        reply(msg.enabled);
        startAutoBio(conn, language);
    } else {
        reply(msg.disabled);
        stopAutoBio();
    }
});

// 2. Start AutoBIO
function startAutoBio(conn, language) {
    // Clear any existing interval to avoid duplicates
    if (autoBioInterval) clearInterval(autoBioInterval);

    // Bio text based on language
    const bioMessages = {
        sinhala: (time) => `💛𝙌𝙐𝙀𝙉𝙉 𝙃𝘼𝙎𝙃𝙄 බොට්👨‍💻 ධාවනය වෙමින්... මෙම ගිණුමේ💛${time}👨‍💻⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚`,
        english: (time) => `💛𝙌𝙐𝙀𝙉𝙉 𝙃𝘼𝙎𝙃𝙄 𝘽𝙊𝙏👨‍💻 𝙍𝙐𝙉𝙉𝙄𝙉𝙂... 𝙄𝙉 𝙏𝙃𝙄𝙎 𝘼𝘾𝙊𝙐𝙉𝙏💛${time}👨‍💻⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚`
    };

    const bioTextFunc = bioMessages[language] || bioMessages.english;

    // Set a new interval to update the bio every minute
    autoBioInterval = setInterval(async () => {
        const time = new Date().toLocaleTimeString();  // Get the current time
        const bioText = bioTextFunc(time);  // Set the bio text with time
        await conn.updateProfileStatus(bioText);  // Update the bot's bio
    }, 60 * 1000);  // 1 minute interval
}

// 3. Stop AutoBIO
function stopAutoBio() {
    if (autoBioInterval) {
        clearInterval(autoBioInterval);  // Stop the interval
        autoBioInterval = null;
        console.log("👨‍💻 AutoBIO feature stopped.");  // Log the stopping of the feature
    }
}
