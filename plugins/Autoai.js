const { cmd, commands } = require('../command');
const axios = require('axios');

let aiChats = {}; // Store chats where AI Auto-Response is enabled

// AI Auto-Response for enabled chats (Groups & Private Chats)
cmd({
  on: "body"
}, async (conn, mek, m, { from, body, isGroup, isOwner }) => {
  try {
    if (aiChats[from]) { // AI enabled for this chat/group
      if (isOwner) return; // Owners should not receive auto-response

      let response = await axios.get(`https://dark-shan-yt.koyeb.app/ai/gemini?q=${encodeURIComponent(body)}`);
      let aiResponse = response.data.data;

      let finalResponse = `${aiResponse}\n> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚`;

      // Send AI response
      await m.reply(finalResponse);
    }
  } catch (e) {
    console.log(e);
    await m.reply(`Error: ${e.message}`);
  }
});

// Command to Enable/Disable Auto-Response in any chat/group
cmd({
  pattern: "autoai",
  desc: "Enable/Disable Auto AI Response for this Chat or Group",
  category: "admin",
  filename: __filename,
}, async (conn, mek, m, { reply, args, isGroup, isAdmins, isOwner }) => {
  if (isGroup && !isAdmins) return reply("Only group admins can use this command in groups!");
  if (!isGroup && !isOwner) return reply("Only the bot owner can enable AI in private chats!");

  if (args[0] === "on") {
    aiChats[m.chat] = true;
    reply("✅ AI Auto-Response is now *Enabled* for this chat.");
  } else if (args[0] === "off") {
    aiChats[m.chat] = false;
    reply("❌ AI Auto-Response is now *Disabled* for this chat.");
  } else {
    reply("Usage: `.autoai on` or `.autoai off`");
  }
});
