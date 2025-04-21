const { cmd, commands } = require("../command");
const { sleep } = require("../lib/functions");
const { readEnv } = require("../lib/database"); // readEnv එකත් එකතු කරනවා

cmd({
    pattern: "restart",
    desc: "Restart the bot JawadYTX",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {
        // Config එකෙන් LANGUAGE කියවනවා
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        // භාෂාව අනුව පණිවිඩ
        const messages = {
            sinhala: {
                onlyOwner: "මෙම විධානය භාවිතා කළ හැක්කේ බොට් හිමිකරුට පමණයි.",
                restarting: "යළි ආරම්භ කරමින්...",
                error: (e) => `දෝෂයක් ඇති වුණා: ${e}`
            },
            english: {
                onlyOwner: "Only the bot owner can use this command.",
                restarting: "Restarting...",
                error: (e) => `An error occurred: ${e}`
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව ගැලපෙන්න පණිවිඩය තෝරනවා. නැත්නම් English යනවා

        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // බොට් හිමිකරුගේ අංකය ගන්නවා
        if (senderNumber !== botOwner) {
            return reply(msg.onlyOwner);
        }

        const { exec } = require("child_process");
        reply(msg.restarting);
        await sleep(1500);
        exec("pm2 restart all");
    } catch (e) {
        console.error(e);
        reply(msg.error(e));
    }
});
