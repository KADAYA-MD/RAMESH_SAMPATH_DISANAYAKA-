const { cmd } = require("../command");
const googleTTS = require('google-tts-api');
const { readEnv } = require('../lib/database');

cmd({
  pattern: "tts2",
  desc: "Convert text to speech with different voices.",
  category: "fun",
  react: "🔊",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    // Config එකෙන් LANGUAGE කියවනවා
    const env = await readEnv();
    const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

    // භාෂාව අනුව පණිවිඩ
    const messages = {
      sinhala: {
        noText: "කරුණාකර පරිවර්තනය සඳහා පෙළක් ලබා දෙන්න! භාවිතය: `.tts <පෙළ>`",
        error: (e) => `දෝෂයක්: ${e.message}`
      },
      english: {
        noText: "Please provide text for conversion! Usage: `.tts <text>`",
        error: (e) => `Error: ${e.message}`
      }
    };

    const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

    // Ensure there is text
    if (!q) {
      return reply(msg.noText);
    }

    // Select voice language based on user input or default to a male voice
    let voiceLanguage = 'en-US'; // Default language is American English with a male voice
    let selectedVoice = 'male';  // Default voice type (we assume it's male by default)

    // Check if user wants a different language or voice
    if (args[0] === "male") {
      voiceLanguage = 'en-US'; // Use American male voice
    } else if (args[0] === "female") {
      voiceLanguage = 'en-GB'; // Use British female voice
      selectedVoice = 'female';
    } else if (args[0] === "loud") {
      voiceLanguage = 'en-US'; // Default male voice, but let's interpret "loud" as normal speech speed.
    } else if (args[0] === "deep") {
      voiceLanguage = 'en-US'; // Deep male voice (still has limitations with `google-tts-api`)
    } else {
      voiceLanguage = 'en-US'; // Default fallback
    }

    // Generate the URL for the TTS audio
    const url = googleTTS.getAudioUrl(q, {
      lang: voiceLanguage,  // Choose language based on selected voice
      slow: false,  // Normal speed for the speech
      host: 'https://translate.google.com'
    });

    // Send the audio message to the user
    await conn.sendMessage(from, { 
      audio: { url: url }, 
      mimetype: 'audio/mpeg', 
      ptt: true 
    }, { quoted: mek });

  } catch (error) {
    console.error(error);
    const env = await readEnv();
    const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
    const msg = messages[language] || messages.english;
    reply(msg.error(error));
  }
});

cmd({
  pattern: "tts3",
  desc: "Convert text to speech with different voices.",
  category: "fun",
  react: "🔊",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    // Config එකෙන් LANGUAGE කියවනවා
    const env = await readEnv();
    const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

    // භාෂාව අනුව පණිවිඩ
    const messages = {
      sinhala: {
        noText: "කරුණාකර පරිවර්තනය සඳහා පෙළක් ලබා දෙන්න! භාවිතය: `.tts2 <පෙළ>`",
        error: (e) => `දෝෂයක්: ${e.message}`
      },
      english: {
        noText: "Please provide text for conversion! Usage: `.tts2 <text>`",
        error: (e) => `Error: ${e.message}`
      }
    };

    const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

    // Ensure there is text
    if (!q) {
      return reply(msg.noText);
    }

    // Set default language
    let voiceLanguage = 'en-US'; // Default language is American English

    // Check if user specifies Urdu language
    if (args[0] === "ur" || args[0] === "urdu") {
      voiceLanguage = 'ur'; // Set language to Urdu
    }

    // Generate the URL for the TTS audio
    const url = googleTTS.getAudioUrl(q, {
      lang: voiceLanguage,  // Choose language based on input
      slow: false,  // Normal speed for the speech
      host: 'https://translate.google.com'
    });

    // Send the audio message to the user
    await conn.sendMessage(from, { 
      audio: { url: url }, 
      mimetype: 'audio/mpeg', 
      ptt: true 
    }, { quoted: mek });

  } catch (error) {
    console.error(error);
    const env = await readEnv();
    const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
    const msg = messages[language] || messages.english;
    reply(msg.error(error));
  }
});
