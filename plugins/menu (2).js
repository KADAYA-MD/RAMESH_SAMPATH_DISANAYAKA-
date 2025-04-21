const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "menu",
    alias: ["list", "cmd", "panel"],
    desc: "commands panel",
    react: "🌸",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Main Menu Caption with English and Emojis
        const cap = `
*🌟🍓 Hi ${pushname}! How are you? 😊🌟*

*┏━━━━━━━━━━━━━━━━━━━━━━━*
*┃ ${new Date().getHours() < 12 ? '🌄 Good Morning!' : '🌙 Good Evening!' }*
*┃ 🤖 Bot Name: 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃*
*┃ 🔖 Version: 𝟐.𝟎*
*┃ 📟 Platform: Linux*
*┃ 👨‍💻 Owner: 𝐑𝐀𝐌𝐄𝐒𝐇*
*┃ 📆 Runtime: ${runtime(process.uptime())}* 
*┃ 📈 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*┗━━━━━━━━━━━━━━━━━━━━━━━*

╭───🎯 *MENU OPTIONS* 🎯───╮
│ 💡 *Reply with a number to explore!*
│─────────────────────
│  *1*  ➜ *Owner Menu* 👑
│  *2*  ➜ *Movie Menu* 🎬
│  *3*  ➜ *AI Menu* 🤖
│  *4*  ➜ *Search Menu* 🔍
│  *5*  ➜ *Download Menu* 📥
│  *6*  ➜ *Main Menu* 🏠
│  *7*  ➜ *Convert Menu* 🔄
│  *8*  ➜ *Other Menu* 🛠️
│  *9*  ➜ *Logo Menu* 🎨
│  *10* ➜ *Fun Menu* 😂
│  *11* ➜ *Group Menu* 👥
│  *12* ➜ *Auto Menu* ⚙️
│  *13* ➜ *News Menu* 📰
╰─────────────────────╯

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;

        // Define All Menus with English, Emojis, and Decorative Fonts
        const menus = {
            menu1: `
*❖━━━👑 OWNER MENU 👑━━━❖*

*╭─「✨ 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner:  𝐊𝐀𝐃𝐀𝐘𝐀*
*╰────────────*

 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: update
 │ 🏷️ᴜsᴇ: prefix update
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setting
 │ 🏷️ᴜsᴇ: prefix setting
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: version
 │ 🏷️ᴜsᴇ: prefix setting
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: jid
 │ 🏷️ᴜsᴇ: prefix jid
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: block
 │ 🏷️ᴜsᴇ: reply messege prefic block
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: unblock
 │ 🏷️ᴜsᴇ:reply messege prefix unblock
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: clearchat
 │ 🏷️ᴜsᴇ: reply messege prefix chearchat
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gjid
 │ 🏷️ᴜsᴇ: gjid
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: restart
 │ 🏷️ᴜsᴇ: prefix restart
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: save
 │ 🏷️ᴜsᴇ: reply messege prefix save
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: send
 │ 🏷️ᴜsᴇ: prefix send 10, Hashi bot
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setbio
 │ 🏷️ᴜsᴇ: prefix setbio
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: boom
 │ 🏷️ᴜsᴇ: prefix 499,Hashi Bot
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: leave
 │ 🏷️ᴜsᴇ: prefix leave
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bug
 │ 🏷️ᴜsᴇ: prefix bug
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: join
 │ 🏷️ᴜsᴇ: prefix join
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: version
 │ 🏷️ᴜsᴇ: prefix version
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐊𝐀𝐃𝐀𝐘𝐀 ᶜᵒᵈᵉʳ
`,

            menu2: `
*❖━━━🎥 MOVIE MENU 🎥━━━❖*

*╭─「✨ 𝐊𝐀𝐃𝐀𝐘𝐀 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner: 𝐑𝐀𝐌𝐄𝐒𝐇*
*╰────────────*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:sinhalasub
 │ 🏷️ᴜsᴇ: prefix sinhalasub <movie name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:firemovie
 │ 🏷️ᴜsᴇ: prefix firemovie <movie name>
 ╰────────────────────✵✵
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐊𝐀𝐃𝐀𝐘𝐀 ᶜᵒᵈᵉʳ
`,

            menu3: `
*❖━━━🧠 AI MENU 🧠━━━❖*

*╭─「𝐤𝐚𝐝𝐚𝐲𝐚 𝐦𝐝 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner: 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰────────────*

 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ai
 │ 🏷️ᴜsᴇ: prefix ai Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: aiimg
 │ 🏷️ᴜsᴇ: prefix aiimg <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: imagine2
 │ 🏷️ᴜsᴇ: prefix imagine2 <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: imagine3
 │ 🏷️ᴜsᴇ: prefix imagine3 <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: imagine4
 │ 🏷️ᴜsᴇ: prefix imagine4 <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bind
 │ 🏷️ᴜsᴇ: prefix bind Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gpt
 │ 🏷️ᴜsᴇ: prefix gpt Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bing
 │ 🏷️ᴜsᴇ: prefix bing Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: blackbox
 │ 🏷️ᴜsᴇ: prefix blackbox Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: siri
 │ 🏷️ᴜsᴇ: prefix siri Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gemini
 │ 🏷️ᴜsᴇ: prefix gemini Hellow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: openai
 │ 🏷️ᴜsᴇ: prefix prefix openai Hellow
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`,

            menu4: `
*❖━━━🔍 SEARCH MENU 🔍━━━❖*

*╭─「✨ 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner: 𝐫𝐚𝐦𝐞𝐬𝐡*
*╰────────────*

 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: vt2
 │ 🏷️ᴜsᴇ: prefix vt2 <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: version
 │ 🏷️ᴜsᴇ: prefix version
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: all
 │ 🏷️ᴜsᴇ: prefix all <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: imagine2
 │ 🏷️ᴜsᴇ: prefix imagine2 <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: photo
 │ 🏷️ᴜsᴇ: prefix photo <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: csong
 │ 🏷️ᴜsᴇ: prefix csong <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: csend
 │ 🏷️ᴜsᴇ: prefix csend <name jid>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: xnxx
 │ 🏷️ᴜsᴇ: prefix xnxx <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: wiki
 │ 🏷️ᴜsᴇ: prefix wiki <car>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: font
 │ 🏷️ᴜsᴇ: prefix font <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: cpt
 │ 🏷️ᴜsᴇ: prefix cpt <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: define
 │ 🏷️ᴜsᴇ: prefix define <car>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: sring
 │ 🏷️ᴜsᴇ: prefix sring <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dog
 │ 🏷️ᴜsᴇ: prefix dog <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: githubstalk
 │ 🏷️ᴜsᴇ: prefix githubstalk <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: google
 │ 🏷️ᴜsᴇ: prefix google <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hiru
 │ 🏷️ᴜsᴇ: prefix hiru
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: img
 │ 🏷️ᴜsᴇ: prefix img <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: rtik
 │ 🏷️ᴜsᴇ: prefix rtik <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: logo
 │ 🏷️ᴜsᴇ: prefix logo <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: movie
 │ 🏷️ᴜsᴇ: prefix movie <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: news
 │ 🏷️ᴜsᴇ: prefix news
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: npm
 │ 🏷️ᴜsᴇ: prefix npm <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: wallpaper
 │ 🏷️ᴜsᴇ: prefix wallapaper <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: quote
 │ 🏷️ᴜsᴇ: prefix quote <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dj
 │ 🏷️ᴜsᴇ: prefix dj <song name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: sp
 │ 🏷️ᴜsᴇ: prefix sp <song name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tiktoksearch
 │ 🏷️ᴜsᴇ: prefix titoksearch <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: stt
 │ 🏷️ᴜsᴇ: prefix stt <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: yta
 │ 🏷️ᴜsᴇ: prefix yta <song or video name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: api
 │ 🏷️ᴜsᴇ: prefix api <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: yts
 │ 🏷️ᴜsᴇ: prefix yts <song or video name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tstalk 
 │ 🏷️ᴜsᴇ: prefix stalk <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: weather
 │ 🏷️ᴜsᴇ: prefix weather <city name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: derana
 │ 🏷️ᴜsᴇ : prefix derana
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: csong
 │ 🏷️ᴜsᴇ: prefix csong <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: epi
 │ 🏷️ᴜsᴇ: prefix epi <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: china
 │ 🏷️ᴜsᴇ: prefix china
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: japan
 │ 🏷️ᴜsᴇ: prefix japan
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: indonesia
 │ 🏷️ᴜsᴇ: prefix indonesia
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: vietnam
 │ 🏷️ᴜsᴇ: prefix vietnam
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: korea
 │ 🏷️ᴜsᴇ: prefix korea
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: malasiya
 │ 🏷️ᴜsᴇ: prefix malasiya
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: thailand
 │ 🏷️ᴜsᴇ: prefix thailand
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: asupan
 │ 🏷️ᴜsᴇ: prefix asupan
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gore
 │ 🏷️ᴜsᴇ: prefix gore
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐤𝐚𝐝𝐚𝐲𝐚 ᶜᵒᵈᵉʳ
`,

            menu5: `
*❖━━━📥 DOWNLOAD MENU 📥━━━❖*

    *╭─「✨ 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner:𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃*
*╰────────────*

 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: all 
 │ 🏷️ᴜsᴇ: prefix all <song/video/img/name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: csong
 │ 🏷️ᴜsᴇ: prefix csong <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: csend
 │ 🏷️ᴜsᴇ: prefix csend <name jid>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: song3
 │ 🏷️ᴜsᴇ: prefix song3 <song name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: epi
 │ 🏷️ᴜsᴇ: prefix epi <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: xnxx
 │ 🏷️ᴜsᴇ: prefix xnxx <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ringdl
 │ 🏷️ᴜsᴇ: prefix epi <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dj
 │ 🏷️ᴜsᴇ: prefix dj <song name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: song
 │ 🏷️ᴜsᴇ: prefix song <name or link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: git
 │ 🏷️ᴜsᴇ: prefix git <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: video
 │ 🏷️ᴜsᴇ: prefix video <name or link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: video2
 │ 🏷️ᴜsᴇ: prefix video2 <name or link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: rtik
 │ 🏷️ᴜsᴇ: prefix rtik <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: lkdl
 │ 🏷️ᴜsᴇ: prefix lkdl <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ig
 │ 🏷️ᴜsᴇ: prefix ig <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tiktok
 │ 🏷️ᴜsᴇ: prefix tiktok <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: fb
 │ 🏷️ᴜsᴇ: prefix fb <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: twitter
 │ 🏷️ᴜsᴇ: prefix twitter <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: mfire
 │ 🏷️ᴜsᴇ: prefix mfire <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: apk
 │ 🏷️ᴜsᴇ: prefix apk <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gdrive
 │ 🏷️ᴜsᴇ: prefix gdrive <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: fb2
 │ 🏷️ᴜsᴇ: prefix fb2 <link>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: logo
 │ 🏷️ᴜsᴇ: prefix logo <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: yts
 │ 🏷️ᴜsᴇ: prefix yts <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: wallpaper
 │ 🏷️ᴜsᴇ: prefix wallpaper <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: stt
 │ 🏷️ᴜsᴇ: prefix stt <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tiktoksearch
 │ 🏷️ᴜsᴇ: prefix tiktoksearch <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: rtik
 │ 🏷️ᴜsᴇ: prefix rtik <name>
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`,

            menu6: `
*❖━━━🗝️ MAIN MENU 🗝️━━━❖*

*╭─「✨ 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner: 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰────────────*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: menu
 │ 🏷️ᴜsᴇ: prefix menu
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: alive
 │ 🏷️ᴜsᴇ: prefix alive
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: update
 │ 🏷️ᴜsᴇ: prefix update
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: version
 │ 🏷️ᴜsᴇ: prefix version
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ping
 │ 🏷️ᴜsᴇ: prefix ping 
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ping2
 │ 🏷️ᴜsᴇ: prefix ping2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: system
 │ 🏷️ᴜsᴇ: prefix system
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: about
 │ 🏷️ᴜsᴇ: prefix about
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: help
 │ 🏷️ᴜsᴇ: prefix help
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: pair
 │ 🏷️ᴜsᴇ: prefix pair <+9477XXXXXXX>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setting
 │ 🏷️ᴜsᴇ: prefix setting
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: owner
 │ 🏷️ᴜsᴇ: prefix owner
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: br
 │ 🏷️ᴜsᴇ: prefix br <message>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: shutdown
 │ 🏷️ᴜsᴇ: prefix shutdown
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐊𝐀𝐃𝐀𝐘𝐀 ᶜᵒᵈᵉʳ
`,

            menu7: `
*❖━━━🔄 CONVERT MENU 🔄━━━❖*

*╭─「✨ 𝐊𝐀𝐃𝐀𝐘𝐀 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner:𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃*
*╰────────────*

 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: sticker
 │ 🏷️ᴜsᴇ: prefix sticker reply message
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tts
 │ 🏷️ᴜsᴇ: prefix tts text
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tts2
 │ 🏷️ᴜsᴇ: prefix tts <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tts3
 │ 🏷️ᴜsᴇ: prefix tts3 <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: url
 │ 🏷️ᴜsᴇ: prefix url reply message
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: take
 │ 🏷️ᴜsᴇ: prefix take reply message
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: sticker
 │ 🏷️ᴜsᴇ: prefix sticker reply message
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: rcolor
 │ 🏷️ᴜsᴇ: prefix rcolor <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: binary
 │ 🏷️ᴜsᴇ: prefix binary <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dbinary
 │ 🏷️ᴜsᴇ: prefix dbinary <binary code>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: base64
 │ 🏷️ᴜsᴇ: prefix base64 text
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: unbase
 │ 🏷️ᴜsᴇ: prefix unbase <unbase code>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: urlencode
 │ 🏷️ᴜsᴇ: prefix urlencode
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: urldecode
 │ 🏷️ᴜsᴇ: prefix urldecode <urlencode>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: vsticker
 │ 🏷️ᴜsᴇ: prefix vsticker reply gift
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: readmore
 │ 🏷️ᴜsᴇ: prefix readmore <message>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 ᶜᵒᵈᵉʳ
`,

            menu8: `
*❖━━━⚙️ OTHER MENU ⚙️━━━❖*

*╭─「✨ 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 HASHI MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner: 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰────────────*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:cpp
 │ 🏷️ᴜsᴇ:prefix cpp
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: csong
 │ 🏷️ᴜsᴇ: prefix csong <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: csend
 │ 🏷️ᴜsᴇ: prefix csend <name jid>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: version
 │ 🏷️ᴜsᴇ: prefix version
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: emix
 │ 🏷️ᴜsᴇ: prefix emix <emoji,emoji>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: del
 │ 🏷️ᴜsᴇ: prefix del <reply message>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: br
 │ 🏷️ᴜsᴇ: prefix br <message>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setpp
 │ 🏷️ᴜsᴇ: prefix setpp
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gpass
 │ 🏷️ᴜsᴇ: prefix gpass
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: timenow
 │ 🏷️ᴜsᴇ: prefix timenow
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: date
 │ 🏷️ᴜsᴇ: prefix date
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: count
 │ 🏷️ᴜsᴇ: prefix count
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: calc
 │ 🏷️ᴜsᴇ: prefix calc <2+8>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: pdf
 │ 🏷️ᴜsᴇ: prefix pdf <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: attp
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: msgall
 │ 🏷️ᴜsᴇ: prefix msgall
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: vcf
 │ 🏷️ᴜsᴇ: prefix vcf
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐊𝐀𝐃𝐀𝐘𝐀 ᶜᵒᵈᵉʳ
`

            menu9: `
*❖━━━🎨 LOGO MENU 🎨━━━❖*

*╭─「✨ 𝐊𝐀𝐃𝐀𝐘𝐀 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟐.𝟎*
*│ 🔥 Owner: 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰────────────*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: logo
 │ 🏷️ᴜsᴇ: prefix logo <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: logo2
 │ 🏷️ᴜsᴇ: prefix attp <text>
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃ᶜᵒᵈᵉʳ
`,

            menu10: `
*❖━━━🎉 FUN MENU 🎉━━━❖*

*╭─「✨𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner: 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃*
*╰────────────*
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: loli
 │ 🏷️ᴜsᴇ: prefix loli
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: waifu
 │ 🏷️ᴜsᴇ: prefix waifu
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: neko
 │ 🏷️ᴜsᴇ: prefix neko
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: megumin
 │ 🏷️ᴜsᴇ: prefix megumin
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: maid
 │ 🏷️ᴜsᴇ: prefix maid
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: awoo
 │ 🏷️ᴜsᴇ: prefix awoo
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: happly
 │ 🏷️ᴜsᴇ: prefix happly
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: heart
 │ 🏷️ᴜsᴇ: prefix heart
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: angry
 │ 🏷️ᴜsᴇ: prefix angry
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: sad
 │ 🏷️ᴜsᴇ: prefix sad
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: shy
 │ 🏷️ᴜsᴇ: prefix shy
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: moon
 │ 🏷️ᴜsᴇ: prefix moon
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: confused
 │ 🏷️ᴜsᴇ: prefix confused
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hot
 │ 🏷️ᴜsᴇ: prefix hot
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: fact
 │ 🏷️ᴜsᴇ: prefix fact
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: fchek
 │ 🏷️ᴜsᴇ: prefix fchek
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: aura
 │ 🏷️ᴜsᴇ: prefix aura
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: roast
 │ 🏷️ᴜsᴇ: prefix roast
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: 8ball
 │ 🏷️ᴜsᴇ: prefix 8ball
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: compliment
 │ 🏷️ᴜsᴇ: prefix compliment
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: lovetest
 │ 🏷️ᴜsᴇ: prefix lovetest
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: emoji
 │ 🏷️ᴜsᴇ: prefix emoji
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hack
 │ 🏷️ᴜsᴇ: prefix hack
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: cry
 │ 🏷️ᴜsᴇ: prefix cry
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: cuddle
 │ 🏷️ᴜsᴇ: prefix cuddle
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bully
 │ 🏷️ᴜsᴇ: prefix bully
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hug
 │ 🏷️ᴜsᴇ: prefix hug
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: lick
 │ 🏷️ᴜsᴇ: prefix lick
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: put
 │ 🏷️ᴜsᴇ: prefix put
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: smug
 │ 🏷️ᴜsᴇ: prefix smug 
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bonk
 │ 🏷️ᴜsᴇ: prefix bonk
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: yeet
 │ 🏷️ᴜsᴇ: prefix yeet
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: blush
 │ 🏷️ᴜsᴇ: prefix blush
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: handhold
 │ 🏷️ᴜsᴇ: prefix handhold
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: highfive
 │ 🏷️ᴜsᴇ: prefix highfive
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: nom
 │ 🏷️ᴜsᴇ: prefix nom
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: wave
 │ 🏷️ᴜsᴇ: prefix wave
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: smile
 │ 🏷️ᴜsᴇ: prefix smile
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: wink
 │ 🏷️ᴜsᴇ: prefix wink
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: happy
 │ 🏷️ᴜsᴇ: prefix happy
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: glomp
 │ 🏷️ᴜsᴇ: prefix glomp
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bite
 │ 🏷️ᴜsᴇ: prefix bite
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: poke
 │ 🏷️ᴜsᴇ: prefix poke
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: cringe
 │ 🏷️ᴜsᴇ: prefix cringe
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dance
 │ 🏷️ᴜsᴇ: prefix dance
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: kill
 │ 🏷️ᴜsᴇ: prefix kill
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: slap
 │ 🏷️ᴜsᴇ: prefix slap
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: kiss
 │ 🏷️ᴜsᴇ: prefix kiss
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: ship
 │ 🏷️ᴜsᴇ: prefix ship
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: roll
 │ 🏷️ᴜsᴇ: prefix roll
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: coinflip
 │ 🏷️ᴜsᴇ: prefix coinflip
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: flip
 │ 🏷️ᴜsᴇ: prefix flip
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: pick
 │ 🏷️ᴜsᴇ: prefix pick
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: rate
 │ 🏷️ᴜsᴇ: prefix rate
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: countx
 │ 🏷️ᴜsᴇ: prefix countx
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: joke
 │ 🏷️ᴜsᴇ: prefix joke
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: flirt
 │ 🏷️ᴜsᴇ: prefix flirt
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: truth
 │ 🏷️ᴜsᴇ: prefix truth
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: dave
 │ 🏷️ᴜsᴇ: prefix dave
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: pickup
 │ 🏷️ᴜsᴇ: prefix pickup
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: char
 │ 🏷️ᴜsᴇ: prefix char
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: repeat
 │ 🏷️ᴜsᴇ: prefix repeat
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 ᶜᵒᵈᵉʳ
`,

            menu11: `
*❖━━━👥 GROUP MENU 👥━━━❖*

*╭─「✨𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner: 𝐊𝐀𝐃𝐀𝐘𝐀*
*╰────────────*

 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: autoai on
 │ 🏷️ᴜsᴇ: prefix autoai on
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: startwallpaper
 │ 🏷️ᴜsᴇ: prefix startwallpaper
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: stopwallpaper
 │ 🏷️ᴜsᴇ: prefix stopwallapaper
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: admins
 │ 🏷️ᴜsᴇ: prefix admins
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: groupdesc
 │ 🏷️ᴜsᴇ: prefix groupdesc
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: groupinfo
 │ 🏷️ᴜsᴇ: prefix groupinfo
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: grouplink
 │ 🏷️ᴜsᴇ: prefix grouplink
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: gname
 │ 🏷️ᴜsᴇ: prefix gname
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setsubject
 │ 🏷️ᴜsᴇ: prefix setsubject
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tagall
 │ 🏷️ᴜsᴇ: prefix tagall
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: requests
 │ 🏷️ᴜsᴇ: prefix requests
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: accept
 │ 🏷️ᴜsᴇ: prefix accept
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:reject
 │ 🏷️ᴜsᴇ: prefix reject
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: unlock
 │ 🏷️ᴜsᴇ: prefix unlock
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: lock
 │ 🏷️ᴜsᴇ: prefix lock
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: approve
 │ 🏷️ᴜsᴇ: prefix approve
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: poll
 │ 🏷️ᴜsᴇ: prefix poll
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: getpic
 │ 🏷️ᴜsᴇ: prefix getpic
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: add3
 │ 🏷️ᴜsᴇ: prefix add3 <9477XXXX>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:appove
 │ 🏷️ᴜsᴇ: prefix appove
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: promote
 │ 🏷️ᴜsᴇ: prefix promote
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: demote
 │ 🏷️ᴜsᴇ: prefix demote
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: requests2
 │ 🏷️ᴜsᴇ: prefix requests2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tagall2
 │ 🏷️ᴜsᴇ: prefix tagall2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:accept2
 │ 🏷️ᴜsᴇ: prefix accept2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: reject
 │ 🏷️ᴜsᴇ: prefix reject
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: leave2
 │ 🏷️ᴜsᴇ: prefix leave2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: invite
 │ 🏷️ᴜsᴇ: prefix invite
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: add
 │ 🏷️ᴜsᴇ: prefix add <9477XXX>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: end
 │ 🏷️ᴜsᴇ: prefix end
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: tagadmin2
 │ 🏷️ᴜsᴇ: prefix tagadmin2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: mute2
 │ 🏷️ᴜsᴇ: prefix mute2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: unmute2
 │ 🏷️ᴜsᴇ: prefix unmute2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: kick
 │ 🏷️ᴜsᴇ: prefix kick
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setname 
 │ 🏷️ᴜsᴇ: prefix setname <name>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: setdesc2 
 │ 🏷️ᴜsᴇ: prefix setdesc2 <text>
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: opemtime2
 │ 🏷️ᴜsᴇ: prefix opentime2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: closetime
 │ 🏷️ᴜsᴇ: prefix closetime
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: join
 │ 🏷️ᴜsᴇ: prefix join
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hidetag2
 │ 🏷️ᴜsᴇ: prefix hidetag2
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: kickall
 │ 🏷️ᴜsᴇ: prefix kickall
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: mute
 │ 🏷️ᴜsᴇ: prefix mute
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: unmute
 │ 🏷️ᴜsᴇ: prefix unmute
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: msgall
 │ 🏷️ᴜsᴇ: prefix msgall
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: vcf
 │ 🏷️ᴜsᴇ: prefix vcf
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`

            menu12: `
*❖━━━⏰ AUTO MENU ⏰━━━❖*

*╭─「✨ 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner: 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃*
*╰────────────*

 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: autoai
 │ 🏷️ᴜsᴇ: prefix autoai on
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: autoai 
 │ 🏷️ᴜsᴇ: prefix autoai off
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:startnews
 │ 🏷️ᴜsᴇ: prefix startnews
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: stopnews
 │ 🏷️ᴜsᴇ: prefix stopnews
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: starttiktok
 │ 🏷️ᴜsᴇ: prefix starttiktok
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: startsong
 │ 🏷️ᴜsᴇ: prefix startsong
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: startwallpaper
 │ 🏷️ᴜsᴇ: prefix startwallpaper
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: stopwallpaper
 │ 🏷️ᴜsᴇ: prefix stopwallpaper
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`,

            menu13: `
*❖━━━📰 NEWS MENU 📰━━━❖*

*╭─「✨ 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃 MENU LIST ✨」*
*│ 🔥 Runtime: ${runtime(process.uptime())}*
*│ 🔥 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│ 🔥 Platform: ${os.hostname()}*
*│ 🔥 Version: 𝟏.𝟎*
*│ 🔥 Owner: 𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃*
*╰────────────*

 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: derana
 │ 🏷️ᴜsᴇ: prefix derana
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: hiru
 │ 🏷️ᴜsᴇ: prefix hiru
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ:sirasa
 │ 🏷️ᴜsᴇ: prefix sirasa
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: itn
 │ 🏷️ᴜsᴇ: prefix itn
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: lankadeepa
 │ 🏷️ᴜsᴇ: prefix lankadeepa
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: bbc
 │ 🏷️ᴜsᴇ: prefix bbc
 ╰────────────────────✵✵
 ╭────────✵✵
 │ 📚ᴄᴏᴍᴍᴀɴᴅ: siyatha
 │ 🏷️ᴜsᴇ: prefix siyatha
 ╰────────────────────✵✵

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`
        };

const aliveMessage = await conn.sendMessage(from, { 
            video: { url: `https://github.com/MR-LAKSIDU/test-web/blob/main/videoguru-20250414-084113212_vGmu7uQJ.mp4?raw=true` }, 
            mimetype: "video/mp4",
            ptv: true,
            contextInfo: {
                externalAdReply: {
                    title: "𝐊𝐀𝐃𝐀𝐘𝐀 𝐌𝐃",
                    body: "𝐊𝐀𝐃𝐀𝐘𝐀",
                    mediaType: 1,
                    sourceUrl: "https://youtube.com/@rp_music_and_gaming?si=ycp75LXq-4RreC9S",
                    thumbnailUrl: "https://i.ibb.co/M5p9dt2d/6514c455419b2a6c.jpg",
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });

        // Send Main Menu Image and Caption
        const sentMsg = await conn.sendMessage(from, {
            image: { url: "https://ibb.co/8DD66xzg" },
            caption: cap,
            contextInfo: {
                mentionedJid: ['94760698006@s.whatsapp.net'],
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363349375266377@newsletter',
                    newsletterName: "𝐤𝐚𝐝𝐚𝐲𝐚",
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        // Handle Menu Selection
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;

            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;

            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
            if (isReplyToSentMsg) {
                const menuImages = {
                    '1': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '2': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '3': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '4': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '5': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '6': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '7': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '8': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '9': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '10': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '11': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '12': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg",
                    '13': "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg"
                };

                const selectedMenu = `menu${messageType}`;
                if (menus[selectedMenu]) {
                    await conn.sendMessage(from, {
                        image: { url: menuImages[messageType] || "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg" },
                        caption: menus[selectedMenu],
                        contextInfo: {
                            mentionedJid: ['94760698006@s.whatsapp.net'],
                            groupMentions: [],
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363349375266377@newsletter',
                                newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐇𝐀𝐒𝐇𝐈",
                                serverMessageId: 999
                            }
                        }
                    }, { quoted: mek });
                } else {
                    await conn.sendMessage(from, {
                        text: "*❌ Invalid Option!*\nPlease reply with a number between 1 and 13.",
                        contextInfo: {
                            mentionedJid: [sender]
                        }
                    }, { quoted: mek });
                }
            }
        });

    } catch (e) {
        console.error("Error:", e);
        reply(`*Oops! Something went wrong:*\n${e.message || e}`);
    }
});