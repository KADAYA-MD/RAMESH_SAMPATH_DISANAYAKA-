const { cmd } = require("../command");

cmd({
  pattern: "forward",
  alias: ["fwd"],
  desc: "Forward media to a single group or phone number with Laksidu's name",
  category: "owner",
  filename: __filename
}, async (client, message, match, { isOwner }) => {
  try {
    // Owner check
    if (!isOwner) return await message.reply("*📛 Owner Only Command*");
    
    // Quoted message check
    if (!message.quoted) return await message.reply("*🍁 Please reply to a message*");

    // ===== [SINGLE TARGET PROCESSING] ===== //
    let targetInput = "";
    
    // Handle match input
    if (typeof match === "string") {
      targetInput = match.trim();
    } else if (Array.isArray(match)) {
      targetInput = match.join(" ").trim();
    } else if (match && typeof match === "object") {
      targetInput = match.text || "";
    }

    // Extract single target (JID or phone number)
    const rawTarget = targetInput.split(/[\s,]+/)[0].trim();
    let targetId = null;

    // Check if it's a group JID or phone number
    if (rawTarget.endsWith('@g.us')) {
      targetId = rawTarget; // Already a group JID
    } else if (/^\d+$/.test(rawTarget)) {
      // Assume it's a phone number, format it
      targetId = `${rawTarget}@s.whatsapp.net`; // Standard WhatsApp ID for phone numbers
    }

    if (!targetId) {
      return await message.reply(
        "❌ වැරදි ගෘප් JID හෝ දුරකථන අංකය\n" +
        "උදාහරණ:\n" +
        ".fwd 987654321098765432@g.us (ගෘප් එක සඳහා)\n" +
        "හෝ\n" +
        ".fwd 94771234567 (දුරකථන අංකය සඳහා)"
      );
    }

    // ===== [MEDIA HANDLING WITH NAME] ===== //
    let messageContent = {};
    const mtype = message.quoted.mtype;
    const senderName = "Laksidu"; // Your name hardcoded
    
    // For media messages
    if (["imageMessage", "videoMessage", "audioMessage", "stickerMessage", "documentMessage"].includes(mtype)) {
      const buffer = await message.quoted.download();
      
      switch (mtype) {
        case "imageMessage":
          messageContent = {
            image: buffer,
            caption: `${message.quoted.text || ''}\n\n✨ Forwarded by ${senderName} ✨`,
            mimetype: message.quoted.mimetype || "image/jpeg"
          };
          break;
        case "videoMessage":
          messageContent = {
            video: buffer,
            caption: `${message.quoted.text || ''}\n\n✨ Forwarded by ${senderName} ✨`,
            mimetype: message.quoted.mimetype || "video/mp4"
          };
          break;
        case "audioMessage":
          messageContent = {
            audio: buffer,
            mimetype: message.quoted.mimetype || "audio/mp4",
            ptt: message.quoted.ptt || false
          };
          break;
        case "stickerMessage":
          messageContent = {
            sticker: buffer,
            mimetype: message.quoted.mimetype || "image/webp"
          };
          break;
        case "documentMessage":
          messageContent = {
            document: buffer,
            mimetype: message.quoted.mimetype || "application/octet-stream",
            fileName: message.quoted.fileName || "document",
            caption: `✨ Forwarded by ${senderName} ✨`
          };
          break;
      }
    } 
    // For text messages
    else if (mtype === "extendedTextMessage" || mtype === "conversation") {
      messageContent = {
        text: `${message.quoted.text}\n\n✨ Forwarded by ${senderName} ✨`
      };
    } 
    // For other message types
    else {
      try {
        messageContent = {
          ...message.quoted,
          text: `${message.quoted.text || ''}\n\n✨ Forwarded by ${senderName} ✨`
        };
      } catch (e) {
        return await message.reply("❌ Unsupported message type");
      }
    }

    // ===== [SENDING TO SINGLE TARGET] ===== //
    await client.sendMessage(targetId, messageContent);
    
    // Success report
    let targetDisplay = targetId.replace(/@s\.whatsapp\.net|@g\.us/, '');
    await message.reply(
      `✅ *Forward Successful*\n\n` +
      `📤 Sent to: ${targetDisplay}\n` +
      `📦 Content Type: ${mtype.replace('Message', '') || 'text'}\n` +
      `👤 By: ${senderName}`
    );

  } catch (error) {
    console.error("Forward Error:", error);
    await message.reply(
      `💢 Error: ${error.message.substring(0, 100)}\n\n` +
      `Please check:\n` +
      `1. Target format (e.g., 987654321098765432@g.us or 94771234567)\n` +
      `2. Media type support\n` +
      `3. Bot permissions`
    );
  }
});

// Jawad TechX - KHAN MD 
// Dont Remove Credit From File 