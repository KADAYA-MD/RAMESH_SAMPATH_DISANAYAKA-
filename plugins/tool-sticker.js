
const path = require("path");
const { fetchGif, fetchImage, gifToSticker } = require('../lib/sticker-utils');
const { tmpdir } = require("os");
const fetch = require("node-fetch");
const Crypto = require("crypto");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require("../lib/functions");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const { cmd } = require('../command');
const { videoToWebp } = require('../lib/video-utils');
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const config = require("../config");
const { readEnv } = require('../lib/database');

cmd(
  {
    pattern: 'vsticker',
    alias: ['gsticker', 'g2s', 'gs', 'v2s', 'vs'],
    desc: 'Convert GIF/Video to a sticker.',
    category: 'sticker',
    use: '<reply media or URL>',
    filename: __filename,
  },
  async (conn, mek, m, { quoted, args, reply }) => {
    try {
      // Config එකෙන් LANGUAGE කියවනවා
      const env = await readEnv();
      const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

      // භාෂාව අනුව පණිවිඩ
      const messages = {
        sinhala: {
          noMedia: "*වීඩියෝවක් හෝ GIF එකකට පිළිතුරු දෙන්න එය ස්ටිකරයක් බවට පරිවර්තනය කිරීමට!*",
          invalidMedia: "*කරුණාකර වලංගු වීඩියෝවකට හෝ GIF එකකට පිළිතුරු දෙන්න.*",
          error: (e) => `❌ දෝෂයක් ඇති වුණා: ${e.message}`
        },
        english: {
          noMedia: "*Reply to a video or GIF to convert it to a sticker!*",
          invalidMedia: "*Please reply to a valid video or GIF.*",
          error: (e) => `❌ An error occurred: ${e.message}`
        }
      };

      const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

      if (!mek.quoted) return reply(msg.noMedia);

      const mime = mek.quoted.mtype;
      if (!['videoMessage', 'imageMessage'].includes(mime)) {
        return reply(msg.invalidMedia);
      }

      // Download the media file
      const media = await mek.quoted.download();

      // Convert the video to a WebP buffer
      const webpBuffer = await videoToWebp(media);

      // Generate sticker metadata
      const sticker = new Sticker(webpBuffer, {
        pack: config.STICKER_NAME || 'My Pack',
        author: '', // Leave blank or customize
        type: StickerTypes.FULL, // FULL for regular stickers
        categories: ['🤩', '🎉'], // Emoji categories
        id: '12345', // Optional ID
        quality: 75, // Set quality for optimization
        background: 'transparent', // Transparent background
      });

      // Convert sticker to buffer and send
      const stickerBuffer = await sticker.toBuffer();
      return conn.sendMessage(mek.chat, { sticker: stickerBuffer }, { quoted: mek });
    } catch (error) {
      console.error(error);
      const env = await readEnv();
      const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
      const msg = messages[language] || messages.english;
      reply(msg.error(error));
    }
  }
);

cmd({
    pattern: "attp",
    desc: "Convert text to a GIF sticker.",
    react: "✨",
    category: "convert",
    use: ".attp HI",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
      // Config එකෙන් LANGUAGE කියවනවා
      const env = await readEnv();
      const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

      // භාෂාව අනුව පණිවිඩ
      const messages = {
        sinhala: {
          noText: "*කරුණාකර පෙළක් ලබා දෙන්න!*",
          error: (e) => `❌ ${e.message}`
        },
        english: {
          noText: "*Please provide text!*",
          error: (e) => `❌ ${e.message}`
        }
      };

      const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

      if (!args[0]) return reply(msg.noText);

      const gifBuffer = await fetchGif(`https://api-fix.onrender.com/api/maker/attp?text=${encodeURIComponent(args[0])}`);
      const stickerBuffer = await gifToSticker(gifBuffer);

      await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: mek });
    } catch (error) {
      const env = await readEnv();
      const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
      const msg = messages[language] || messages.english;
      reply(msg.error(error));
    }
});
