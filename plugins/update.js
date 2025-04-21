const { cmd } = require('../command');
const { exec } = require('child_process');
const config = require('../config');
const { readEnv } = require('../lib/database');

cmd(
  {
    pattern: "update",
    desc: "Update the bot",
    category: "owner",
    react: "🔄",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      // Config එකෙන් LANGUAGE කියවනවා
      const env = await readEnv();
      const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

      // භාෂාව අනුව පණිවිඩ
      const messages = {
        sinhala: {
          notOwner: "❌ ඔබ අයිතිකරු නෙවෙයි!",
          updating: "*Hashi Bot නව වෙළුම යාවත්කාලීන කරමින්...*\n> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌 💚",
          success: "💚𝙺_𝙰_𝙳_𝙰_𝚈_𝙰__𝙼𝙳❤️ Bot සාර්ථකව යාවත්කාලීන කරන ලදී. ✅\n\n> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐫𝐚𝐦𝐞𝐬𝐡 ᶜᵒᵈᵉʳ",
          error: (e) => `දෝෂයක් ඇති වුණා: ${e.message}`,
          execError: (error) => `දෝෂය: ${error.message}`,
          execStderr: (stderr) => `Stderr: ${stderr}`
        },
        english: {
          notOwner: "❌ You Are Not A Owner!",
          updating: "*Updating 𝐤𝐚𝐝𝐚𝐲𝐚 𝐦𝐝 Bot New Version...*\n> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : Ｋ  Ａ  Ｄ  Ａ  Ｙ  Ａ 🤌 💚",
          success: "𝐤𝐚𝐝𝐚𝐲𝐚 𝐦𝐝 Bot Update successfully. ✅\n\n> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐫𝐚𝐦𝐞𝐬𝐡 ᶜᵒᵈᵉʳ",
          error: (e) => `An error occurred: ${e.message}`,
          execError: (error) => `Error: ${error.message}`,
          execStderr: (stderr) => `Stderr: ${stderr}`
        }
      };

      const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

      // Check if the user is the owner
      if (!isOwner) {
        return reply(msg.notOwner);
      }

      reply(msg.updating);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Sleep function

      exec("pm2 restart all", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reply(msg.execError(error));
          return;
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          reply(msg.execStderr(stderr));
          return;
        }
        console.log(`Stdout: ${stdout}`);
        reply(msg.success);
      });
    } catch (e) {
      console.error(e);
      const env = await readEnv();
      const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
      const msg = messages[language] || messages.english;
      reply(msg.error(e));
    }
  }
);
