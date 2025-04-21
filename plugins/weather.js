const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const { readEnv } = require('../lib/database');

cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        // Config එකෙන් LANGUAGE කියවනවා
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        // භාෂාව අනුව පණිවිඩ
        const messages = {
            sinhala: {
                noCity: "❗ කරුණාකර නගරයක නමක් ලබා දෙන්න. භාවිතය: .weather [නගරයේ නම]",
                weather: (data) => `
🌍 *${data.name}, ${data.sys.country} සඳහා කාලගුණය* 🌍

🌡️ *උෂ්ණත්වය*: ${data.main.temp}°C
🌡️ *දැනෙන උෂ්ණත්වය*: ${data.main.feels_like}°C
🌡️ *අවම උෂ්ණත්වය*: ${data.main.temp_min}°C
🌡️ *උපරිම උෂ්ණත්වය*: ${data.main.temp_max}°C
💧 *ආර්ද්‍රතාවය*: ${data.main.humidity}%
☁️ *කාලගුණය*: ${data.weather[0].main}
🌫️ *විස්තරය*: ${data.weather[0].description}
💨 *සුළං වේගය*: ${data.wind.speed} m/s
🔽 *පීඩනය*: ${data.main.pressure} hPa

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  𝐤𝐚𝐝𝐚𝐲𝐚 ᶜᵒᵈᵉʳ*
`,
                cityNotFound: "🚫 නගරය හමු නොවීය. කරුණාකර අකුරු වින්‍යාසය පරීක්ෂා කර නැවත උත්සාහ කරන්න.",
                error: "⚠️ කාලගුණ තොරතුරු ලබා ගැනීමේදී දෝෂයක් ඇති වුණා. කරුණාකර පසුව උත්සාහ කරන්න."
            },
            english: {
                noCity: "❗ Please provide a city name. Usage: .weather [city name]",
                weather: (data) => `
🌍 *Weather for ${data.name}, ${data.sys.country}* 🌍

🌡️ *Temperature*: ${data.main.temp}°C
🌡️ *Feels Like*: ${data.main.feels_like}°C
🌡️ *Min Temp*: ${data.main.temp_min}°C
🌡️ *Max Temp*: ${data.main.temp_max}°C
💧 *Humidity*: ${data.main.humidity}%
☁️ *Weather*: ${data.weather[0].main}
🌫️ *Description*: ${data.weather[0].description}
💨 *Wind Speed*: ${data.wind.speed} m/s
🔽 *Pressure*: ${data.main.pressure} hPa

> *⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : 𝐤𝐚𝐝𝐚𝐲𝐚 𝐦𝐝 💛*
`,
                cityNotFound: "🚫 City not found. Please check the spelling and try again.",
                error: "⚠️ An error occurred while fetching the weather information. Please try again later."
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

        // Check if a city name was provided
        if (!q) return reply(msg.noCity);

        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        return reply(msg.weather(data));
    } catch (e) {
        console.log(e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        if (e.response && e.response.status === 404) {
            return reply(msg.cityNotFound);
        }
        return reply(msg.error);
    }
});
