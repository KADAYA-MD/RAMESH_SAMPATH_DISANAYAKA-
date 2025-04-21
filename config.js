const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "put your session id.",
    MONGODB: process.env.MONGODB || "mongodb+srv://freefireindu12:YQ8W9dFc8PHMH5MK@kadayaz.nhbllew.mongodb.net/",
    PREFIX: process.env.PREFIX || ".",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "true",
    MODE: process.env.MODE || "public",
    LANGUAGE: process.env.LANGUAGE || "sinhala",
    AUTO_VOICE: process.env.AUTO_VOICE || "false",
    AUTO_REACT: process.env.AUTO_REACT || "true",
    FAKE_RECORDING: process.env.FAKE_RECORDING || "true",
    AUTO_TYPING: process.env.AUTO_TYPING || "false",
    ANTI_LINK: process.env.ANTI_LINK || "true",
    ANTI_BAD: process.env.ANTI_BAD || "true",
    ANTI_DELETE_MAX_SIZE: process.env.ANTI_DELETE_MAX_SIZE || "500",
    READ_MESSAGE: process.env.READ_MESSAGE || "true",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
    ANTI_DELETE: process.env.ANTI_DELETE || "true",
    DELETEMSGSENDTO: process.env.DELETEMSGSENDTO === undefined ? '' : process.env.DELETEMSGSENDTO,
    INBOX_BLOCK: process.env.INBOX_BLOCK || "false",
    AUTO_NEWS_GROUP_JID: process.env.AUTO_NEWS_GROUP_JID || "120363417453798885@g.us", // Specific group JID එක
    AUTO_NEWS_ENABLED: process.env.AUTO_NEWS_ENABLED || "true",
    AUTO_TIKTOK: process.env.AUTO_TIKTOK || "true",
    AUTO_TIKTOK_JID: process.env.AUTO_TIKTOK_JID || "120363417453798885@g.us" // Specific group JID එක


};
