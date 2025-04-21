const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    jidNormalizedUser,
    getContentType,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    isJidBroadcast,
    AnyMessageContent,
    prepareWAMessageMedia,
    areJidsSameUser,
    downloadContentFromMessage,
    MessageRetryMap,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    generateMessageID,
    makeInMemoryStore,
    jidDecode,
    fetchLatestBaileysVersion,
    Browsers
} = require('@whiskeysockets/baileys')

const l = console.log
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
const fs = require('fs')
const P = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { sms, downloadMediaMessage } = require('./lib/msg')
const axios = require('axios')
const path = require('path')
const { File } = require('megajs')
 const prefix = ('.')

// Owner Number
const ownerNumber = ['94703830990']

// Session ID Handling
if (!fs.existsSync(__dirname + '/session/creds.json')) {
    if (!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!');
    const sessdata = config.SESSION_ID;
    const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
    filer.download((err, data) => {
    if (err) throw err
    fs.writeFile(__dirname + '/session/creds.json', data, () => {
    console.log("Session downloaded ✅");
    })})}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

async function connectToWA() {
const connectDB = require('./lib/mongodb')
 connectDB()
 const { readEnv } = require('./lib/database')
 const config = await readEnv()


 console.log("Connecting wa bot 🧬...");
 const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/session/')
 var { version } = await fetchLatestBaileysVersion()

const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Firefox"),
        syncFullHistory: true,
        auth: state,
        version
    })

    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
                connectToWA()
            }
        } else if (connection === 'open') {
            console.log('😼 Installing... ')
            const path = require('path');
            fs.readdirSync("./plugins/").forEach((plugin) => {
                if (path.extname(plugin).toLowerCase() === ".js") {
                    require("./plugins/" + plugin);
                }
            });
            console.log('​🅺🅰🅳🅰🆈🅰 installed successful ✅')
            console.log('​🅺🅰🅳🅰🆈🅰 connected to whatsapp ✅')
            let up = `*​🅺🅰🅳🅰🆈🅰-ᴍᴅ ᴄᴏɴɴᴇᴄᴛᴇᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʏ ✅*\n\n📚 _ᴛʏᴘᴇ *.menu* ᴀɴᴅ ɢᴇᴛ ​🅺🅰🅳🅰🆈🅰 ᴄᴏᴍᴍᴀɴᴅ ʟɪꜱᴛ_\n\n🧑🏻‍💻 _ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴄᴏɴᴛᴀᴄᴛ ꜱᴜᴘᴏʀᴛᴇᴅ ᴛʏᴘᴇ *.owner* ᴄᴏᴍᴍᴀɴᴅ_\n\n⚘ _ꜰᴏʟʟᴏᴡ ᴛʜᴇ ​🅺🅰🅳🅰🆈🅰 ᴜᴘᴅᴀᴛᴇꜱ ᴄʜᴀɴᴇʟ ᴛᴏ ꜱᴇᴇ ​🅺🅰🅳🅰🆈🅰 ᴍᴅ ɴᴇᴡ ᴜᴘᴅᴀᴛᴇꜱ_\n\n❗ *ᴛʜɪꜱ ʙᴏᴛ ᴀᴄᴛɪᴠᴇ ꜱᴇᴇ ᴛʜᴇ ʙᴜᴛ ɪᴛ ꜱ  ɴᴏᴛ ᴡᴏʀᴋɪɴɢ ᴏɴ ᴄᴏᴍᴍᴀɴᴅꜱ ᴄʜᴀɴɢᴇ ꜱᴇꜱꜱɪᴏɴ ɪᴅ ᴀɴᴅ ʀᴇᴅᴇᴘʟᴏʏ*\n\n> 🐥𝐂𝐑𝐄𝐀𝐓𝐄 𝐁𝐘 𝐑𝐀𝐌𝐄𝐒𝐇`;
            conn.sendMessage(ownerNumber + "@s.whatsapp.net", {
                image: { url: `https://i.ibb.co/RpYdg2pM/Screenshot-20250402-092823-Gallery.jpg` },
                caption: up
            })
        }
    })

    conn.ev.on('creds.update', saveCreds)

    conn.ev.on('messages.upsert', async (mek) => {
        mek = mek.messages[0]
        if (!mek.message) return
        mek.message = (getContentType(mek.message) === 'ephemeralMessage')
            ? mek.message.ephemeralMessage.message
            : mek.message;
//console.log("New Message Detected:", JSON.stringify(mek, null, 2));
        if (config.READ_MESSAGE === 'true') {
            await conn.readMessages([mek.key]);
            console.log(`Marked message from ${mek.key.remoteJid} as read.`);
        }

        if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true") {
            await conn.readMessages([mek.key]);
            const mnyako = await jidNormalizedUser(conn.user.id);
            await conn.sendMessage(mek.key.remoteJid, { react: { key: mek.key, text: '👾' } }, { statusJidList: [mek.key.participant, mnyako] });
        }

        if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true") {
            const emojis = ['🤍', '❤️', '🧡', '💛', '💚', '💝', '💙', '💜', '💖', '💗', '✨'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            await conn.sendMessage(mek.key.remoteJid, {
                react: { text: randomEmoji, key: mek.key }
            }, { statusJidList: [mek.key.participant] });
        }

        const m = sms(conn, mek)
        var smg = m
        const type = getContentType(mek.message)
        const content = JSON.stringify(mek.message)
        const from = mek.key.remoteJid
        const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
        const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')
        const isGroup = from.endsWith('@g.us')
        const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
        const senderNumber = sender.split('@')[0]
        const botNumber = conn.user.id.split(':')[0]
        const pushname = mek.pushName || 'Laksidu Nimsara'
        const isMe = botNumber.includes(senderNumber);
        const isOwner = ownerNumber.includes(senderNumber) || isMe
        const botNumber2 = await jidNormalizedUser(conn.user.id);
        const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const participants = isGroup ? await groupMetadata.participants : ''
        const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false;
        const isAdmins = isGroup ? groupAdmins.includes(sender) : false
        const isReact = m.message.reactionMessage ? true : false
        const reply = (teks) => {
            conn.sendMessage(from, { text: teks }, { quoted: mek })
        }

        conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
            }
            let type = mime.split("/")[0] + "Message";
            if (mime === "application/pdf") {
                return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
            }
            if (mime.split("/")[0] === "image") {
                return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
            }
            if (mime.split("/")[0] === "video") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
            }
            if (mime.split("/")[0] === "audio") {
                return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
            }
        }

        //__________________________________________ANTI DELETE_________________________________
    if (!m.id.startsWith("BAE5")) {
    
    // Ensure the base directory exists
    const baseDir = 'message_data';
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
    
    function loadChatData(remoteJid, messageId) {
      const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
      try {
        const data = fs.readFileSync(chatFilePath, 'utf8');
        return JSON.parse(data) || [];
      } catch (error) {
        return [];
      }
    }
    
    function saveChatData(remoteJid, messageId, chatData) {
      const chatDir = path.join(baseDir, remoteJid);
    
      if (!fs.existsSync(chatDir)) {
        fs.mkdirSync(chatDir, { recursive: true });
      }
    
      const chatFilePath = path.join(chatDir, `${messageId}.json`);
    
      try {
        fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
       // console.log('Chat data saved successfully.');
      } catch (error) {
        console.error('Error saving chat data:', error);
      }
    }
        
    function handleIncomingMessage(message) {
      const remoteJid = from //message.key.remoteJid;
      const messageId = message.key.id;
    
      const chatData = loadChatData(remoteJid, messageId);
    
      chatData.push(message);
    
      saveChatData(remoteJid, messageId, chatData);
    
    //  console.log('Message received and saved:', messageId);
    }
    
    const delfrom = config.DELETEMSGSENDTO !=='' ? config.DELETEMSGSENDTO + '@s.whatsapp.net': from
    function handleMessageRevocation(revocationMessage) {
    //const remoteJid = revocationMessage.message.protocolMessage.key.remoteJid;
     //const messageId = revocationMessage.message.protocolMessage.key.id;
    const remoteJid = from // revocationMessage.msg.key.remoteJid;
    const messageId = revocationMessage.msg.key.id;
    
        
     // console.log('Received revocation message with ID:', messageId);
    
      const chatData = loadChatData(remoteJid, messageId);
    
       const originalMessage = chatData[0]   
    
      if (originalMessage) {
        const deletedBy = revocationMessage.sender.split('@')[0];
        const sentBynn = originalMessage.key.participant ?? revocationMessage.sender;
    const sentBy = sentBynn.split('@')[0];
          if ( deletedBy.includes(botNumber) || sentBy.includes(botNumber) ) return;
     if(originalMessage.message && originalMessage.message.conversation && originalMessage.message.conversation !== ''){
         const messageText = originalMessage.message.conversation;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
         var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` });
    //........................................//........................................
    }else if(originalMessage.msg.type ==='MESSAGE_EDIT'){
     conn.sendMessage(delfrom, { text: `❌ *edited message detected* ${originalMessage.message.editedMessage.message.protocolMessage.editedMessage.conversation}` },{quoted: mek});
     
    //........................................//........................................
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage && originalMessage.msg.text ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messageText = originalMessage.msg.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
     var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` });
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
     var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.body}${xx}` });
    }else if(originalMessage.type === 'extendedTextMessage') {
    async function quotedMessageRetrive(){     
    var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                
    if(originalMessage.message.extendedTextMessage){
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }else{
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }
    }
    
    quotedMessageRetrive()
           
    }else if(originalMessage.type === 'imageMessage') {
          async function imageMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.imageMessage.caption){
    const messageText = originalMessage.message.imageMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.imageMessage.caption}` })
    }else{
        await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` })
    }       
        }
    imageMessageRetrive()
     
    }else if(originalMessage.type === 'videoMessage') {
          async function videoMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
    
    const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = config.ANTI_DELETE_MAX_SIZE
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if(originalMessage.message.videoMessage.caption){
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    const messageText = originalMessage.message.videoMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.videoMessage.caption}` })
           }
    }else{
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
        const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = '500'
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
        await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` })
    }
    }       
    }
    videoMessageRetrive()
    }else if(originalMessage.type === 'documentMessage') {
          async function documentMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    
        
    
    if(originalMessage.message.documentWithCaptionMessage){
    
    await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`});
     
    }else{
    
    await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`});
    
    }
     }
    
    documentMessageRetrive()
    }else if(originalMessage.type === 'audioMessage') {
          async function audioMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.audioMessage){
    const audioq = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: audioq});
    
    }else{
    if(originalMessage.message.audioMessage.ptt === "true"){
    
    const pttt = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, ptt: 'true',fileName: `${m.id}.mp3` })	
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: pttt});
    
     }
      }
     }
    
    audioMessageRetrive()
    }else if(originalMessage.type === 'stickerMessage') {
          async function stickerMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.stickerMessage){
     
    //await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
     const sdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'Lara-MD'})
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: sdata});
    
    }else{
    
    const stdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'Lara-MD'})
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: stdata});
    
      }
     }
    
    stickerMessageRetrive()
             }
         
      } else {
        console.log('Original message not found for revocation.');
      }
    }
    
    if (mek.msg && mek.msg.type === 0) {
      handleMessageRevocation(mek);
    } else {//if(mek.message && mek.message.conversation && mek.message.conversation !== ''){
      handleIncomingMessage(mek);
    
        }
    
    }
        //__________________________________________STATUS DOWNLOAD_________________________________
        if (body === "send" || body === "Send" || body === "Seve" || body === "Ewpm" || body === "ewpn" || body === "Dapan" || body === "dapan" || body === "oni" || body === "Oni" || body === "save" || body === "Save" || body === "ewanna" || body === "Ewanna" || body === "ewam" || body === "Ewam" || body === "sv" || body === "Sv" || body === "දාන්න" || body === "එවන්නකෝ") {
            const data = JSON.stringify(mek.message, null, 2);
            const jsonData = JSON.parse(data);
            const isStatus = jsonData.extendedTextMessage?.contextInfo?.remoteJid;
            if (!isStatus) return;

            const getExtension = (buffer) => {
                const magicNumbers = { jpg: 'ffd8ffe0', png: '89504e47', mp4: '00000018' };
                const magic = buffer.toString('hex', 0, 4);
                return Object.keys(magicNumbers).find(key => magicNumbers[key] === magic);
            };

            if (m.quoted.type === 'imageMessage') {
                var nameJpg = getRandom('');
                let buff = await m.quoted.download(nameJpg);
                let ext = getExtension(buff);
                await fs.promises.writeFile("./" + ext, buff);
                const caption = m.quoted.imageMessage.caption;
                await conn.sendMessage(from, { image: fs.readFileSync("./" + ext), caption: caption });
            } else if (m.quoted.type === 'videoMessage') {
                var nameJpg = getRandom('');
                let buff = await m.quoted.download(nameJpg);
                let ext = getExtension(buff);
                await fs.promises.writeFile("./" + ext, buff);
                const caption = m.quoted.videoMessage.caption;
                let buttonMessage = {
                    video: fs.readFileSync("./" + ext),
                    mimetype: "video/mp4",
                    fileName: `${m.id}.mp4`,
                    caption: caption,
                    headerType: 4
                };
                await conn.sendMessage(from, buttonMessage, { quoted: mek });
            }
        }

        //________________________________________INBOX BLOCK_________________________________
        if (config.INBOX_BLOCK === "true" && mek.key.remoteJid.endsWith('@s.whatsapp.net')) {
            if (!mek.key.fromMe) {
                console.log(`Auto-block initiated for ${mek.key.remoteJid}...`);
                try {
                    await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 1 ❗*" });
                    await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 2 ❗*" });
                    await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 3 ❗*" });
                    await conn.sendMessage(mek.key.remoteJid, { text: "*Blocked 🚫*" });
                    await conn.updateBlockStatus(mek.key.remoteJid, 'block');
                    console.log(`User ${mek.key.remoteJid} blocked after warnings.`);
                } catch (error) {
                    console.error(`Error during auto-block for ${mek.key.remoteJid}:`, error);
                }
                return;
            }
        }

        //______________________________________PUBLIC REACT_________________________________
        if (!isReact && senderNumber !== botNumber) {
            if (config.AUTO_REACT === 'true') {
                const reactions = ['😺', '👍', '😹', '💯', '🔥', '🙏', '🎉', '👏', '😼', '🤖'];
                const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
                m.react(randomReaction);
            }
        }
        //_____________________________________
        //AUto Read Function 
conn.ev.on('messages.upsert', async (mek) => {
    try {
        mek = mek.messages[0];
        if (!mek.message) return;

        // Handle ephemeral messages
        mek.message = (getContentType(mek.message) === 'ephemeralMessage') 
            ? mek.message.ephemeralMessage.message 
            : mek.message;

        // Auto-read functionality
        if (config.READ_MESSAGE === 'true') {
            await conn.readMessages([mek.key]);  // Mark message as read
            console.log(`Marked message from ${mek.key.remoteJid} as read.`);
        }

        // Continue with your existing message processing logic here...
        const m = sms(conn, mek);
        const type = getContentType(mek.message);
        const content = JSON.stringify(mek.message);
        const from = mek.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const sender = mek.key.fromMe 
            ? conn.user.id.split(':')[0] + '@s.whatsapp.net' 
            : mek.key.participant || mek.key.remoteJid;

        // More code...
    } catch (err) {
        console.error('Error in message handler:', err);
    }
});    
//_________________STATUS_REACT_FUNCTION_____________
conn.decodeJid = jid => {
      if (!jid) return jid;
      if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (
          (decode.user &&
            decode.server &&
            decode.user + '@' + decode.server) ||
          jid
        );
      } else return jid;
    };


        //____________________________________OWNER REACT_________________________________
        if (senderNumber.includes("94703830990")) {
            if (isReact) return
            m.react("👨‍💻")
        }
        //_________Ofline___________________
      if (config.ALWAYS_ONLINE === "false") {
        conn.sendPresenceUpdate('unavailable'); // Sets the bot's last seen status
        }

        //___________________________________BOT WORK MODE_________________________________
        if (!isOwner && config.MODE === "private") return;
        if (!isOwner && isGroup && config.MODE === "inbox") return;
        if (!isOwner && !isGroup && config.MODE === "groups") return;

        //___________________________________COMMAND CHECK_________________________________
        const events = require('./command');
        const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
        if (isCmd) {
            const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName));
            if (cmd) {
                if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key } });
                try {
                    cmd.function(conn, mek, m, {
                        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
                    });
                } catch (e) {
                    console.error("[PLUGIN ERROR] " + e);
        }
        }
        }

        //_________________________________PLUGIN MAP_________________________________
        events.commands.map(async (command) => {
            if (body && command.on === "body") {
                command.function(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
            } else if (mek.q && command.on === "text") {
                command.function(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
            } else if ((command.on === "image" || command.on === "photo") && mek.type === "imageMessage") {
                command.function(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
            } else if (command.on === "sticker" && mek.type === "stickerMessage") {
                command.function(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
            }});
//_______________________________________________________________________________________________________________________
})
}

app.get("/", (req, res) => {
    res.send("𝗸𝗮𝗱𝗮𝘆𝗮 𝗺𝗱 𝗯𝗼𝘁 𝗶𝘀 𝗰𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱✅");
});
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
setTimeout(() => {
    connectToWA();
}, 4000);