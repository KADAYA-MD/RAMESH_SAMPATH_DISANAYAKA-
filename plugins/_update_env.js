const { updateEnv, readEnv } = require('../lib/database');
const EnvVar = require('../lib/mongodbenv');
const { cmd } = require('../command');

cmd({
    pattern: "updateenv",
    alias: ["updateenv"],
    desc: "Check and update environment variables",
    category: "owner",
    filename: __filename,
},
async (conn, mek, m, { from, q, reply, isOwner }) => {
    if (!isOwner) return;

    // Config එකෙන් LANGUAGE කියවනවා
    const env = await readEnv();
    const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

    // භාෂාව අනුව පණිවිඩ
    const messages = {
        sinhala: {
            noPermission: "🙇‍♂️ *ඔබට මෙම ක්‍රියාව සිදු කිරීමට අවසර නැත.*",
            noQuery: "🙇‍♂️ *කරුණාකර ඉන්වයරන්මන්ට් වෙරියබල් එක සහ එහි නව වටිනාකම සපයන්න.* \n\nඋදාහරණය: `.update ALIVE_MSG: HELLOW I AM LAKSIDU`",
            invalidFormat: "🫠 *වැරදි ආකෘතියකි. කරුණාකර මෙම ආකෘතිය භාවිතා කරන්න:* `.update KEY:VALUE`",
            invalidMode: (validModes) => `😒 *වැරදි මෝඩ් එකක්. වලංගු මෝඩ්: ${validModes.join(', ')}*`,
            invalidUrl: "😓 *වැරදි URL ආකෘතියකි. කරුණාකර රූප URL එකක් දෙන්න.*",
            invalidBoolean: (key) => `😓 *${key} සඳහා වැරදි වටිනාකමක්. කරුණාකර 'true' හෝ 'false' භාවිතා කරන්න.*`,
            invalidString: (key) => `😓 *${key} සඳහා වැරදි වටිනාකමක්. කරුණාකර වලංගු string එකක් භාවිතා කරන්න.*`,
            invalidJid: (key) => `😓 *${key} සඳහා වැරදි JID ආකෘතියකි. කරුණාකර වලංගු WhatsApp JID එකක් භාවිතා කරන්න.*`,
            varNotFound: (key, envList) => `❌ *${key} ඉන්වයරන්මන්ට් වෙරියබල් එක හමු නොවීය.*\n\n*පවතින ඉන්වයරන්මන්ට් වෙරියබල්ස්:*\n\n${envList}`,
            success: (key, value, mode) => `✅ *ඉන්වයරන්මන්ට් වෙරියබල් යාවත්කාලීන කරන ලදි.*\n\n🗃️ *${key}* ➠ ${value} ${mode ? `\n*මෝඩ්:* ${mode}` : ''}\n\n\n> HASHI MD`,
            error: (err) => "💃🏻 *ඉන්වයරන්මන්ට් වෙරියබල් යාවත්කාලීන කිරීමට අපොහොසත් විය. කරුණාකර නැවත උත්සාහ කරන්න.* " + err,
        },
        english: {
            noPermission: "🙇‍♂️ *You don’t have permission to perform this action.*",
            noQuery: "🙇‍♂️ *Please provide the environment variable and its new value.* \n\nExample: `.update ALIVE_MSG: HELLOW I AM LAKSIDU`",
            invalidFormat: "🫠 *Invalid format. Please use the format:* `.update KEY:VALUE`",
            invalidMode: (validModes) => `😒 *Invalid mode. Valid modes are: ${validModes.join(', ')}*`,
            invalidUrl: "😓 *Invalid URL format. PLEASE GIVE ME IMAGE URL*",
            invalidBoolean: (key) => `😓 *Invalid value for ${key}. Please use 'true' or 'false'.*`,
            invalidString: (key) => `😓 *Invalid value for ${key}. Please use a valid string.*`,
            invalidJid: (key) => `😓 *Invalid JID format for ${key}. Please use a valid WhatsApp JID.*`,
            varNotFound: (key, envList) => `❌ *The environment variable ${key} does not exist.*\n\n*Here are the existing environment variables:*\n\n${envList}`,
            success: (key, value, mode) => `✅ *Environment variable updated.*\n\n🗃️ *${key}* ➠ ${value} ${mode ? `\n*Mode:* ${mode}` : ''}\n\n\n> HASHI MD`,
            error: (err) => "💃🏻 *Failed to update the environment variable. Please try again.* " + err,
        }
    };

    const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි භාවිතා කරනවා

    if (!q) {
        return reply(msg.noQuery);
    }

    // පළමු colon හෝ comma එකේ පිහිටීම හොයනවා
    const colonIndex = q.indexOf(':');
    const commaIndex = q.indexOf(',');

    // වලංගු delimiter එකක් තියෙනවද කියල බලනවා
    const delimiterIndex = colonIndex !== -1 ? colonIndex : commaIndex;
    if (delimiterIndex === -1) {
        return reply(msg.invalidFormat);
    }

    // Key සහ Value ලබාගන්නවා
    const key = q.substring(0, delimiterIndex).trim();
    const value = q.substring(delimiterIndex + 1).trim();
    
    // Mode එක ලබාගන්නවා (ඇත්නම්)
    const parts = value.split(/\s+/).filter(part => part.trim());
    const newValue = value; // පරිශීලකයා දුන් පූර්ණ වටිනාකම භාවිතා කරනවා
    const mode = parts.length > 1 ? parts.slice(1).join(' ').trim() : '';
    
    const validModes = ['public', 'private', 'groups', 'inbox'];
    const finalMode = validModes.includes(mode) ? mode : '';

    if (!key || !newValue) {
        return reply(msg.invalidFormat);
    }

    // Validation checks for all environment variables
    if (key === 'ALIVE_IMG' && !newValue.startsWith('https://')) {
        return reply(msg.invalidUrl);
    }
    if (key === 'START_PHOTO_URL' && !newValue.startsWith('https://')) {
        return reply(msg.invalidUrl);
    }
    if (key === 'PREFIX' && newValue.length > 1) {
        return reply(msg.invalidString('PREFIX')); // PREFIX should be a single character
    }
    if (key === 'LANGUAGE' && !['sinhala', 'english'].includes(newValue.toLowerCase())) {
        return reply(msg.invalidString('LANGUAGE')); // Only sinhala or english allowed
    }
    if (key === 'AUTO_READ_STATUS' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('AUTO_READ_STATUS'));
    }
    if (key === 'AUTO_REACT' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('AUTO_REACT'));
    }
    if (key === 'FAKE_RECORDING' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('FAKE_RECORDING'));
    }
    if (key === 'AUTO_TYPING' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('AUTO_TYPING'));
    }
    if (key === 'ANTI_LINK' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('ANTI_LINK'));
    }
    if (key === 'AUTO_VOICE' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('AUTO_VOICE'));
    }
    if (key === 'AUTO_REPLY' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('AUTO_REPLY'));
    }
    if (key === 'ANTI_BAD' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('ANTI_BAD'));
    }
    if (key === 'READ_MESSAGE' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('READ_MESSAGE'));
    }
    if (key === 'ALWAYS_ONLINE' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('ALWAYS_ONLINE'));
    }
    if (key === 'ANTI_DELETE' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('ANTI_DELETE'));
    }
    if (key === 'INBOX_BLOCK' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('INBOX_BLOCK'));
    }
    if (key === 'ANTI_BOT' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('ANTI_BOT'));
    }
    if (key === 'AUTO_TIKTOK' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('AUTO_TIKTOK'));
    }
    if (key === 'AUTO_NEWS_ENABLED' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('AUTO_NEWS_ENABLED'));
    }
    if (key === 'SEND_START_NEWS' && !['true', 'false'].includes(newValue)) {
        return reply(msg.invalidBoolean('SEND_START_NEWS'));
    }
    if (key === 'AUTO_NEWS_GROUP_JID' && !newValue.endsWith('@g.us')) {
        return reply(msg.invalidJid('AUTO_NEWS_GROUP_JID')); // Should be a valid WhatsApp group JID
    }
    if (key === 'AUTO_TIKTOK_JID' && !newValue.endsWith('@g.us')) {
        return reply(msg.invalidJid('AUTO_TIKTOK_JID')); // Should be a valid WhatsApp group JID
    }
    if (key === 'DELETEMSGSENDTO' && newValue && !newValue.endsWith('@s.whatsapp.net') && !newValue.endsWith('@g.us')) {
        return reply(msg.invalidJid('DELETEMSGSENDTO')); // Should be a valid WhatsApp JID or empty
    }

    try {
        // ඉන්වයරන්මන්ට් වෙරියබල් එක තියෙනවද කියල බලනවා
        const envVar = await EnvVar.findOne({ key: key });

        if (!envVar) {
            // එකක් නැත්නම්, පවතින සියලුම env vars ලැයිස්තුවක් ගන්නවා
            const allEnvVars = await EnvVar.find({});
            const envList = allEnvVars.map(env => `${env.key}: ${env.value}`).join('\n');
            return reply(msg.varNotFound(key, envList));
        }

        // ඉන්වයරන්මන්ට් වෙරියබල් යාවත්කාලීන කරනවා
        await updateEnv(key, newValue, finalMode);
        reply(msg.success(key, newValue, finalMode));
        
    } catch (err) {
        console.error('Error updating environment variable:' + err.message);
        reply(msg.error(err));
    }
});