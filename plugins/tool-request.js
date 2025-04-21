const { cmd } = require("../command");
const config = require("../config");
const { readEnv } = require('../lib/database');

cmd({
    pattern: "report",
    alias: ["ask", "bug", "request"],
    desc: "Report a bug or request a feature",
    category: "utility",
    filename: __filename
}, async (conn, mek, m, {
    from, body, command, args, senderNumber, reply
}) => {
    try {
        // Config එකෙන් LANGUAGE කියවනවා
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        // භාෂාව අනුව පණිවිඩ
        const messages = {
            sinhala: {
                notOwner: "මෙම විධානය භාවිතා කළ හැක්කේ bot හිමිකරුට පමණි.",
                noArgs: `උදාහරණය: ${config.PREFIX}report Play විධානය වැඩ කරන්නේ නැහැ`,
                alreadyReported: "මෙම වාර්තාව දැනටමත් හිමිකරු වෙත යවා ඇත. කරුණාකර පිළිතුරක් එන තුරු රැඳී සිටින්න.",
                reportText: (sender, args) => `*| ඉල්ලීම/දෝෂය |*\n\n*පරිශීලක*: @${sender.split("@")[0]}\n*ඉල්ලීම/දෝෂය*: ${args.join(" ")}`,
                confirmationText: (pushName) => `හායි ${pushName}, කරුණාකර රැඳී සිටින්න...`,
                error: "ඔබගේ වාර්තාව සැකසීමේදී දෝෂයක් ඇති වුණා."
            },
            english: {
                notOwner: "Only the bot owner can use this command.",
                noArgs: `Example: ${config.PREFIX}report Play command is not working`,
                alreadyReported: "This report has already been forwarded to the owner. Please wait for a response.",
                reportText: (sender, args) => `*| REQUEST/BUG |*\n\n*User*: @${sender.split("@")[0]}\n*Request/Bug*: ${args.join(" ")}`,
                confirmationText: (pushName) => `Hi ${pushName}, 𝗣𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...`,
                error: "An error occurred while processing your report."
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply(msg.notOwner);
        }
        
        if (!args.length) {
            return reply(msg.noArgs);
        }

        const reportedMessages = {};
        const devNumber = "94771470396"; // Bot owner's number
        const messageId = m.key.id;

        if (reportedMessages[messageId]) {
            return reply(msg.alreadyReported);
        }
        reportedMessages[messageId] = true;

        await conn.sendMessage(`${devNumber}@s.whatsapp.net`, {
            text: msg.reportText(m.sender, args),
            mentions: [m.sender]
        }, { quoted: m });

        reply(msg.confirmationText(m.pushName));
    } catch (error) {
        console.error(error);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});
