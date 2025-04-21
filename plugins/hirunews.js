const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config');

let lastNewsTitles = {};

// Config එකෙන් ඔටෝ පුවත් සක්‍රියද බලනවා
if (config.AUTO_NEWS_ENABLED && config.AUTO_NEWS_GROUP_JID) {
    let groupId = config.AUTO_NEWS_GROUP_JID;

    async function getLatestNews() {
        try {
            const apiUrl = `https://suhas-bro-apii.vercel.app/hiru`;
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data || !data.newsURL || !data.title || !data.image || !data.text) {
                return [];
            }

            return [{
                title: data.title,
                content: data.text,
                image: data.image,
                url: data.newsURL,
                date: new Date().toLocaleString(),
                source: "හිරු පුවත්"
            }];
        } catch (error) {
            console.error(`හිරු පුවත් ලබාගැනීමේ දෝෂයක්: ${error.message}`);
            return [];
        }
    }

    // නව පුවත් පරීක්ෂා කර config එකේ JID එකට යැවීම
    async function checkAndPostNews(conn) {
        const latestNews = await getLatestNews();
        latestNews.forEach(async (newsItem) => {
            if (!lastNewsTitles[groupId]) {
                lastNewsTitles[groupId] = [];
            }

            if (!lastNewsTitles[groupId].includes(newsItem.title)) {
                let newsInfo = "*📑හිරු ඔටෝ පුවත් අනතුරු ඇඟවීම📑*\n\n";
                newsInfo += `📰 *මාතෘකාව*: ${newsItem.title}\n\n`;
                newsInfo += `📝 *විස්තරය*:\n${newsItem.content}\n\n`;
                newsInfo += `📅 *දිනය*: ${newsItem.date}\n\n`;
                newsInfo += `⛓️‍💥 *ලින්ක්*: www.hirunews.lk\n\n`;
                newsInfo += `> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`;

                if (newsItem.image) {
                    await conn.sendMessage(groupId, {
                        image: { url: newsItem.image },
                        caption: newsInfo
                    });
                } else {
                    await conn.sendMessage(groupId, { text: newsInfo });
                }

                lastNewsTitles[groupId].push(newsItem.title);
                if (lastNewsTitles[groupId].length > 100) {
                    lastNewsTitles[groupId].shift();
                }
            }
        });
    }

    // Bot ආරම්භයේදී ඔටෝ පුවත් සේවාව ආරම්භ කිරීම
    module.exports = {
        onStart: async (conn) => {
            console.log("හිරු ඔටෝ පුවත් සේවාව ආරම්භ විය...");
            setInterval(async () => {
                await checkAndPostNews(conn);
            }, 60000); // සෑම තත්පර 60කට වරක් පරීක්ෂා කරයි
        }
    };
}

// තනි විධානයක් ලෙස හිරු පුවත් ලබාගැනීම
cmd({
    pattern: "hiru",
    alias: ["hirunews", "newshiru", "hirulk"],
    react: "⭐",
    category: "search hiru news",
    desc: "හිරු පුවත්  එකෙන් ලබාගන්න",
    use: "",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const apiUrl = `https://all-news-api-dexter-gift.onrender.com/news/lankadeepa`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.newsURL || !data.title || !data.image || !data.text) {
            return reply(`*මේ මොහොතේ පුවත් නොමැත* ❗`);
        }

        const { newsURL, title, image, text } = data;

        let newsInfo = "*📰LAKIYA HIRU NEWS📰*\n\n";
        newsInfo += `✨ *මාතෘකාව*: ${title}\n\n`;
        newsInfo += `📝 *විස්තරය*:\n${text}\n\n`;
        newsInfo += `⛓️‍💥 *ලින්ක්*: www.hirunews.lk\n\n`;
        newsInfo += `> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`;

        if (image) {
            await conn.sendMessage(m.chat, {
                image: { url: image },
                caption: newsInfo,
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { text: newsInfo }, { quoted: m });
        }
    } catch (error) {
        console.error(error);
        reply(`*මේ මොහොතේ පුවත් ලබාගැනීමේ දෝෂයක් ඇති විය* ❗`);
    }
});
