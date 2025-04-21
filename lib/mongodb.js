const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://ibb.co/8DD66xzg' },
    { key: 'PREFIX', value: '.' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'LANGUAGE', value: 'sinhala' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'AUTO_REACT', value: 'true' }, 
    { key: 'FAKE_RECORDING', value: 'true' },
    { key: 'AUTO_TYPING', value: 'true' },
    { key: 'ANTI_LINK', value: 'true' },
    { key: 'AUTO_VOICE', value: 'true' },
    { key: 'AUTO_REPLY', value: 'true' },
    { key: 'ANTI_BAD', value: 'true' },
    { key: 'READ_MESSAGE', value: 'true' },
    { key: 'ALWAYS_ONLINE', value: 'true' },
    { key: 'ANTI_DELETE', value: 'true' },
    { key: 'DELETEMSGSENDTO', value: '' },
    { key: 'INBOX_BLOCK', value: 'false' },
    { key: 'ANTI_BOT', value: 'true' },
    { key: 'AUTO_TIKTOK', value: 'true' },
    { key: 'AUTO_NEWS_ENABLED', value: 'true' },
    { key: 'SEND_START_NEWS', value: 'true' },
    { key: 'AUTO_NEWS_GROUP_JID', value: '120363417453798885@g.us' },
    { key: 'AUTO_TIKTOK_JID', value: '120363417453798885@g.us' },
    { key: 'START_PHOTO_URL', value: 'https://i.ibb.co/M5p9dt2d/6514c455419b2a6c.jpg' }

];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
