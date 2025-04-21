const { cmd, commands } = require('../command');
const { File } = require("megajs");

cmd({
    pattern: "mega",
    desc: "commands panel",
    react: "🎀",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    // Validate the provided URL
    if (!q || !isUrl(q) || !q.includes("mega.nz")) {
      return reply("Please provide a valid Mega.nz file URL.");
    }

    // Extract file URL and decryption key
    const [fileUrl, decryptionKey] = q.split('#');
    if (!decryptionKey) {
      return reply("Error: Decryption key is missing in the provided URL.");
    }

    // Start file download
    const megaFile = File.fromURL(fileUrl + '#' + decryptionKey);
    megaFile.on("progress", (downloaded, total) => {
      const progressPercentage = ((downloaded / total) * 100).toFixed(2);
      reply(`Downloading: ${progressPercentage}% (${(downloaded / 1024 / 1024).toFixed(2)} MB of ${(total / 1024 / 1024).toFixed(2)} MB)`);
    });

    // Download file and send it
    const fileBuffer = await megaFile.downloadBuffer();
    const documentMessage = {
      document: fileBuffer,
      mimetype: "application/octet-stream",
      fileName: "mega_downloaded_file"
    };

    const options = { quoted: message };
    await conn.sendMessage(from, documentMessage, options);
    reply("*create by laksidu*");
  } catch (error) {
    console.error(error);
    reply("Error: " + error.message);
  }
});
