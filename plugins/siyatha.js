const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

// API LINK
const apilink = 'https://dizer-adaderana-news-api.vercel.app/news'; 

cmd({
    pattern: "siyathanews",
    alias: ["siyatha", "news4"],
    react: "📰",
    desc: "Siyatha News ලබා ගැනීම",
    category: "news",
    use: '.siyatha',
    filename: __filename
},
async (conn, mek, m, { from, quoted }) => {
    try {
        // Fetch news data from the API
        const response = await axios.get(apilink);
        const news = response.data[0]; // Access the first item of the array

        // Construct the message
        const msg = `
           📰 *SIYATHA NEWS* 📰

*මාතෘකාව* - ${news.title || 'නැත'}
*පුවත* - ${news.description || 'නැත'}
*දිනය* - ${news.time || 'නැත'}
*ලින්ක්* - ${news.new_url || 'නැත'}

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ ᴍʀ ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
        `;

        // Send the news as a message
        await conn.sendMessage(from, { 
            image: { url: news.image || '' }, 
            caption: msg 
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { 
            text: '⚠️ දෝෂයක් සිදු විය. API එකෙන් දත්ත ලබා ගැනීමට නොහැකි විය!' 
        }, { quoted: mek });
    }
});