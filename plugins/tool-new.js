const { sleep } = require('../lib/functions');
const { cmd, commands } = require('../command');
const { readEnv } = require('../lib/database');

cmd({
    pattern: "rcolor",
    desc: "Generate a random color with name and code.",
    category: "utility",
    filename: __filename,
}, 
async (conn, mek, m, { reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { result: (name, hex) => `🎨 *යම් යම් වර්ණය:* \nනම: ${name}\nකේතය: ${hex}`, error: "❌ යම් යම් වර්ණයක් ජනනය කිරීමේදී දෝෂයක් ඇති වුණා." },
            english: { result: (name, hex) => `🎨 *Random Color:* \nName: ${name}\nCode: ${hex}`, error: "❌ An error occurred while generating the random color." }
        };
        const msg = messages[language] || messages.english;

        const colorNames = ["Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", "Gray", "Cyan", "Magenta", "Violet", "Indigo", "Teal", "Lavender", "Turquoise"];
        const randomColorHex = "#" + Math.floor(Math.random()*16777215).toString(16);
        const randomColorName = colorNames[Math.floor(Math.random() * colorNames.length)];

        reply(msg.result(randomColorName, randomColorHex));
    } catch (e) {
        console.error("Error in .randomcolor command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "binary",
    desc: "Convert text into binary format.",
    category: "utility",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { noText: "❌ කරුණාකර බයිනරි බවට පරිවර්තනය කිරීමට පෙළ ලබා දෙන්න.", result: (binary) => `🔑 *බයිනරි නිරූපණය:* \n${binary}`, error: "❌ බයිනරි බවට පරිවර්තනය කිරීමේදී දෝෂයක් ඇති වුණා." },
            english: { noText: "❌ Please provide the text to convert to binary.", result: (binary) => `🔑 *Binary Representation:* \n${binary}`, error: "❌ An error occurred while converting to binary." }
        };
        const msg = messages[language] || messages.english;

        if (!args.length) return reply(msg.noText);

        const textToConvert = args.join(" ");
        const binaryText = textToConvert.split('').map(char => `00000000${char.charCodeAt(0).toString(2)}`.slice(-8)).join(' ');

        reply(msg.result(binaryText));
    } catch (e) {
        console.error("Error in .binary command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "dbinary",
    desc: "Decode binary string into text.",
    category: "utility",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { noText: "❌ කරුණාකර විකේතනය කිරීමට බයිනරි ලයිනය ලබා දෙන්න.", result: (text) => `🔓 *විකේතනය කළ පෙළ:* \n${text}`, error: "❌ බයිනරි ලයිනය විකේතනය කිරීමේදී දෝෂයක් ඇති වුණා." },
            english: { noText: "❌ Please provide the binary string to decode.", result: (text) => `🔓 *Decoded Text:* \n${text}`, error: "❌ An error occurred while decoding the binary string." }
        };
        const msg = messages[language] || messages.english;

        if (!args.length) return reply(msg.noText);

        const binaryString = args.join(" ");
        const textDecoded = binaryString.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');

        reply(msg.result(textDecoded));
    } catch (e) {
        console.error("Error in .binarydecode command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "base64",
    desc: "Encode text into Base64 format.",
    category: "utility",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { noText: "❌ කරුණාකර Base64 බවට සංකේතනය කිරීමට පෙළ ලබා දෙන්න.", result: (encoded) => `🔑 *සංකේතිත Base64 පෙළ:* \n${encoded}`, error: "❌ Base64 බවට සංකේතනය කිරීමේදී දෝෂයක් ඇති වුණා." },
            english: { noText: "❌ Please provide the text to encode into Base64.", result: (encoded) => `🔑 *Encoded Base64 Text:* \n${encoded}`, error: "❌ An error occurred while encoding the text into Base64." }
        };
        const msg = messages[language] || messages.english;

        if (!args.length) return reply(msg.noText);

        const textToEncode = args.join(" ");
        const encodedText = Buffer.from(textToEncode).toString('base64');

        reply(msg.result(encodedText));
    } catch (e) {
        console.error("Error in .base64 command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "unbase64",
    desc: "Decode Base64 encoded text.",
    category: "utility",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { noText: "❌ කරුණාකර විකේතනය කිරීමට Base64 සංකේතිත පෙළ ලබා දෙන්න.", result: (decoded) => `🔓 *විකේතනය කළ පෙළ:* \n${decoded}`, error: "❌ Base64 පෙළ විකේතනය කිරීමේදී දෝෂයක් ඇති වුණා." },
            english: { noText: "❌ Please provide the Base64 encoded text to decode.", result: (decoded) => `🔓 *Decoded Text:* \n${decoded}`, error: "❌ An error occurred while decoding the Base64 text." }
        };
        const msg = messages[language] || messages.english;

        if (!args.length) return reply(msg.noText);

        const base64Text = args.join(" ");
        const decodedText = Buffer.from(base64Text, 'base64').toString('utf-8');

        reply(msg.result(decodedText));
    } catch (e) {
        console.error("Error in .unbase64 command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "urlencode",
    desc: "Encode text into URL encoding.",
    category: "utility",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { noText: "❌ කරුණාකර URL සංකේතනයට පෙළ ලබා දෙන්න.", result: (encoded) => `🔑 *සංකේතිත URL පෙළ:* \n${encoded}`, error: "❌ පෙළ සංකේතනය කිරීමේදී දෝෂයක් ඇති වුණා." },
            english: { noText: "❌ Please provide the text to encode into URL encoding.", result: (encoded) => `🔑 *Encoded URL Text:* \n${encoded}`, error: "❌ An error occurred while encoding the text." }
        };
        const msg = messages[language] || messages.english;

        if (!args.length) return reply(msg.noText);

        const textToEncode = args.join(" ");
        const encodedText = encodeURIComponent(textToEncode);

        reply(msg.result(encodedText));
    } catch (e) {
        console.error("Error in .urlencode command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "urldecode",
    desc: "Decode URL encoded text.",
    category: "utility",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { noText: "❌ කරුණාකර විකේතනය කිරීමට URL සංකේතිත පෙළ ලබා දෙන්න.", result: (decoded) => `🔓 *විකේතනය කළ පෙළ:* \n${decoded}`, error: "❌ URL සංකේතිත පෙළ විකේතනය කිරීමේදී දෝෂයක් ඇති වුණා." },
            english: { noText: "❌ Please provide the URL encoded text to decode.", result: (decoded) => `🔓 *Decoded Text:* \n${decoded}`, error: "❌ An error occurred while decoding the URL encoded text." }
        };
        const msg = messages[language] || messages.english;

        if (!args.length) return reply(msg.noText);

        const encodedText = args.join(" ");
        const decodedText = decodeURIComponent(encodedText);

        reply(msg.result(decodedText));
    } catch (e) {
        console.error("Error in .urldecode command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "roll",
    desc: "Roll a dice (1-6).",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { result: (num) => `🎲 ඔබ ලබාගත්තේ: *${num}*`, error: "❌ දාදු ගැසීමේදී දෝෂයක් ඇති වුණා." },
            english: { result: (num) => `🎲 You rolled: *${num}*`, error: "❌ An error occurred while rolling the dice." }
        };
        const msg = messages[language] || messages.english;

        const result = Math.floor(Math.random() * 6) + 1;
        reply(msg.result(result));
    } catch (e) {
        console.error("Error in .roll command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "coinflip",
    desc: "Flip a coin and get Heads or Tails.",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { result: (res) => `🪙 කාසිය පෙරළීමේ ප්‍රතිඵලය: *${res === "Heads" ? "මුහුණ" : "පිටුපස"}*`, error: "❌ කාසිය පෙරළීමේදී දෝෂයක් ඇති වුණා." },
            english: { result: (res) => `🪙 Coin Flip Result: *${res}*`, error: "❌ An error occurred while flipping the coin." }
        };
        const msg = messages[language] || messages.english;

        const result = Math.random() < 0.5 ? "Heads" : "Tails";
        reply(msg.result(result));
    } catch (e) {
        console.error("Error in .coinflip command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "flip",
    desc: "Flip the text you provide.",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { noText: "❌ කරුණාකර පෙරළීමට පෙළ ලබා දෙන්න.", result: (text) => `🔄 පෙරළූ පෙළ: *${text}*`, error: "❌ පෙළ පෙරළීමේදී දෝෂයක් ඇති වුණා." },
            english: { noText: "❌ Please provide the text to flip.", result: (text) => `🔄 Flipped Text: *${text}*`, error: "❌ An error occurred while flipping the text." }
        };
        const msg = messages[language] || messages.english;

        if (!args.length) return reply(msg.noText);

        const flippedText = args.join(" ").split('').reverse().join('');
        reply(msg.result(flippedText));
    } catch (e) {
        console.error("Error in .flip command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "pick",
    desc: "Pick between two choices.",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { noOptions: "❌ කරුණාකර තෝරා ගැනීමට විකල්ප දෙකක් ලබා දෙන්න. උදා: `.pick අයිස්ක්‍රීම්, පීසා`", result: (option) => `🎉 Bot තෝරා ගත්තේ: *${option}*`, error: "❌ ඔබගේ ඉල්ලීම සැකසීමේදී දෝෂයක් ඇති වුණා." },
            english: { noOptions: "❌ Please provide two choices to pick from. Example: `.pick Ice Cream, Pizza`", result: (option) => `🎉 Bot picks: *${option}*`, error: "❌ An error occurred while processing your request." }
        };
        const msg = messages[language] || messages.english;

        if (args.length < 2) return reply(msg.noOptions);

        const option = args.join(" ").split(',')[Math.floor(Math.random() * 2)].trim();
        reply(msg.result(option));
    } catch (e) {
        console.error("Error in .pick command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "timenow",
    desc: "Check the current local time.",
    category: "utility",
    filename: __filename,
}, 
async (conn, mek, m, { reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { result: (time) => `🕒 ශ්‍රී ලංකාවේ දැනට වේලාව: ${time}`, error: "❌ දෝෂයක් ඇති වුණා. කරුණාකර පසුව උත්සාහ කරන්න." },
            english: { result: (time) => `🕒 Current Local Time in Sri Lanka: ${time}`, error: "❌ An error occurred. Please try again later." }
        };
        const msg = messages[language] || messages.english;

        const now = new Date();
        const localTime = now.toLocaleTimeString("en-US", { 
            hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: "Asia/Colombo" // Changed to Sri Lanka time zone
        });

        reply(msg.result(localTime));
    } catch (e) {
        console.error("Error in .timenow command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "date",
    desc: "Check the current date.",
    category: "utility",
    filename: __filename,
}, 
async (conn, mek, m, { reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { result: (date) => `📅 දැනට දිනය: ${date}`, error: "❌ දෝෂයක් ඇති වුණා. කරුණාකර පසුව උත්සාහ කරන්න." },
            english: { result: (date) => `📅 Current Date: ${date}`, error: "❌ An error occurred. Please try again later." }
        };
        const msg = messages[language] || messages.english;

        const now = new Date();
        const currentDate = now.toLocaleDateString("en-US", {
            weekday: "long", year: "numeric", month: "long", day: "numeric"
        });

        reply(msg.result(currentDate));
    } catch (e) {
        console.error("Error in .date command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "shapar",
    desc: "Send shapar ASCII art with mentions.",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { 
                notGroup: "මෙම විධානය සමූහයකදී පමණක් භාවිතා කළ හැක.", 
                noMention: "කරුණාකර ASCII කලාව යැවීමට පරිශීලකයෙකු mention කරන්න.", 
                result: (user) => `😂 @${user.split("@")[0]}!\n😂 ඔබ වෙනුවෙන්:\n\n${`
          _______
       .-'       '-.
      /           /|
     /           / |
    /___________/  |
    |   _______ |  |
    |  |  \\ \\  ||  |
    |  |   \\ \\ ||  |
    |  |____\\ \\||  |
    |  '._  _.'||  |
    |    .' '.  ||  |
    |   '.___.' ||  |
    |___________||  |
    '------------'  |
     \\_____________\\|
`}`, 
                error: "විධානය සැකසීමේදී දෝෂයක් ඇති වුණා. කරුණාකර නැවත උත්සාහ කරන්න." 
            },
            english: { 
                notGroup: "This command can only be used in groups.", 
                noMention: "Please mention a user to send the ASCII art to.", 
                result: (user) => `😂 @${user.split("@")[0]}!\n😂 that for you:\n\n${`
          _______
       .-'       '-.
      /           /|
     /           / |
    /___________/  |
    |   _______ |  |
    |  |  \\ \\  ||  |
    |  |   \\ \\ ||  |
    |  |____\\ \\||  |
    |  '._  _.'||  |
    |    .' '.  ||  |
    |   '.___.' ||  |
    |___________||  |
    '------------'  |
     \\_____________\\|
`}`, 
                error: "An error occurred while processing the command. Please try again." 
            }
        };
        const msg = messages[language] || messages.english;

        if (!isGroup) return reply(msg.notGroup);

        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) return reply(msg.noMention);

        await conn.sendMessage(from, { text: msg.result(mentionedUser), mentions: [mentionedUser] }, { quoted: m });
    } catch (e) {
        console.error("Error in .shapar command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "rate",
    desc: "Rate someone out of 10.",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { notGroup: "මෙම විධානය සමූහයකදී පමණක් භාවිතා කළ හැක.", noMention: "කරුණාකර ඇගයීමට කෙනෙකු mention කරන්න.", result: (user, rating) => `@${user.split("@")[0]} 10න් ${rating}ක් ලෙස ඇගයෙනවා.`, error: "දෝෂයක් ඇති වුණා. කරුණාකර නැවත උත්සාහ කරන්න." },
            english: { notGroup: "This command can only be used in groups.", noMention: "Please mention someone to rate.", result: (user, rating) => `@${user.split("@")[0]} is rated ${rating}/10.`, error: "An error occurred. Please try again." }
        };
        const msg = messages[language] || messages.english;

        if (!isGroup) return reply(msg.notGroup);

        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) return reply(msg.noMention);

        const randomRating = Math.floor(Math.random() * 10) + 1;
        await conn.sendMessage(from, { text: msg.result(mentionedUser, randomRating), mentions: [mentionedUser] }, { quoted: m });
    } catch (e) {
        console.error("Error in .rate command:", e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "countx",
    desc: "Start a reverse countdown from the specified number to 1.",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, reply, senderNumber }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { 
                notOwner: "❎ මෙම විධානය bot හිමිකරුට පමණි.", 
                noArgs: "✳️ මෙම විධානය මෙසේ භාවිතා කරන්න:\n *උදා:* .countx 10", 
                invalid: "❎ කරුණාකර 1 සහ 50 අතර වලංගු අංකයක් ලබා දෙන්න.", 
                start: (num) => `⏳ ${num} සිට ප්‍රතිලෝම ගණන් කිරීම ආරම්භ වෙනවා...`, 
                end: "✅ ගණන් කිරීම අවසන්.", 
                error: "❎ ඔබගේ ඉල්ලීම සැකසීමේදී දෝෂයක් ඇති වුණා." 
            },
            english: { 
                notOwner: "❎ Only the bot owner can use this command.", 
                noArgs: "✳️ Use this command like:\n *Example:* .countx 10", 
                invalid: "❎ Please specify a valid number between 1 and 50.", 
                start: (num) => `⏳ Starting reverse countdown from ${num}...`, 
                end: "✅ Countdown completed.", 
                error: "❎ An error occurred while processing your request." 
            }
        };
        const msg = messages[language] || messages.english;

        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) return reply(msg.notOwner);

        if (!args[0]) return reply(msg.noArgs);

        const count = parseInt(args[0].trim());
        if (isNaN(count) || count <= 0 || count > 50) return reply(msg.invalid);

        reply(msg.start(count));

        for (let i = count; i >= 1; i--) {
            await conn.sendMessage(m.chat, { text: `${i}` }, { quoted: mek });
            await sleep(1000);
        }

        reply(msg.end);
    } catch (e) {
        console.error(e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "count",
    desc: "Start a countdown from 1 to the specified number.",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, reply, senderNumber }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { 
                notOwner: "❎ මෙම විධානය bot හිමිකරුට පමණි.", 
                noArgs: "✳️ මෙම විධානය මෙසේ භාවිතා කරන්න:\n *උදා:* .count 10", 
                invalid: "❎ කරුණාකර 1 සහ 50 අතර වලංගු අංකයක් ලබා දෙන්න.", 
                start: (num) => `⏳ ${num} දක්වා ගණන් කිරීම ආරම්භ වෙනවා...`, 
                end: "✅ ගණන් කිරීම අවසන්.", 
                error: "❎ ඔබගේ ඉල්ලීම සැකසීමේදී දෝෂයක් ඇති වුණා." 
            },
            english: { 
                notOwner: "❎ Only the bot owner can use this command.", 
                noArgs: "✳️ Use this command like:\n *Example:* .count 10", 
                invalid: "❎ Please specify a valid number between 1 and 50.", 
                start: (num) => `⏳ Starting countdown to ${num}...`, 
                end: "✅ Countdown completed.", 
                error: "❎ An error occurred while processing your request." 
            }
        };
        const msg = messages[language] || messages.english;

        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) return reply(msg.notOwner);

        if (!args[0]) return reply(msg.noArgs);

        const count = parseInt(args[0].trim());
        if (isNaN(count) || count <= 0 || count > 50) return reply(msg.invalid);

        reply(msg.start(count));

        for (let i = 1; i <= count; i++) {
            await conn.sendMessage(m.chat, { text: `${i}` }, { quoted: mek });
            await sleep(1000);
        }

        reply(msg.end);
    } catch (e) {
        console.error(e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});

cmd({
    pattern: "calculate",
    alias: ["calc"],
    desc: "Evaluate a mathematical expression.",
    category: "utilities",
    filename: __filename
},
async (conn, mek, m, { args, reply }) => {
    try {
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        const messages = {
            sinhala: { 
                noArgs: "✳️ මෙම විධානය මෙසේ භාවිතා කරන්න:\n *උදා:* .calculate 5+3*2", 
                invalid: "❎ වලංගු නොවන ප්‍රකාශනයකි. අංක සහ +, -, *, /, ( ) පමණක් භාවිතා කළ හැක.", 
                calcError: "❎ ගණනය කිරීමේ දෝෂයක්. කරුණාකර ඔබගේ ප්‍රකාශනය පරීක්ෂා කරන්න.", 
                result: (expr, res) => `✅ "${expr}" හි ප්‍රතිඵලය: ${res}`, 
                error: "❎ ඔබගේ ඉල්ලීම සැකසීමේදී දෝෂයක් ඇති වුණා." 
            },
            english: { 
                noArgs: "✳️ Use this command like:\n *Example:* .calculate 5+3*2", 
                invalid: "❎ Invalid expression. Only numbers and +, -, *, /, ( ) are allowed.", 
                calcError: "❎ Error in calculation. Please check your expression.", 
                result: (expr, res) => `✅ Result of "${expr}" is: ${res}`, 
                error: "❎ An error occurred while processing your request." 
            }
        };
        const msg = messages[language] || messages.english;

        if (!args[0]) return reply(msg.noArgs);

        const expression = args.join(" ").trim();
        if (!/^[0-9+\-*/().\s]+$/.test(expression)) return reply(msg.invalid);

        let result;
        try {
            result = eval(expression);
        } catch (e) {
            return reply(msg.calcError);
        }

        reply(msg.result(expression, result));
    } catch (e) {
        console.error(e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error);
    }
});
