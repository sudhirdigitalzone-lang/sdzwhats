module.exports = async function (sock, message, args) {
    try {
        if (!args[0]) {
            return sock.sendMessage(
                message.key.remoteJid,
                { text: "❌ Number daalo\nExample: .sdz 91XXXXXXXXXX" },
                { quoted: message }
            );
        }

        let number = args[0].replace(/\D/g, '');
        let jid = number + "@s.whatsapp.net";

        const text = `Hello 👋  
This is an automated message from SDZ Bot 🤖  

Aapko yeh message test ke liye bheja gaya hai.
Thank you 😊`;

        await sock.sendMessage(jid, { text });
        await sock.sendMessage(
            message.key.remoteJid,
            { text: "✅ Message sent successfully!" },
            { quoted: message }
        );

    } catch (err) {
        console.log(err);
        await sock.sendMessage(
            message.key.remoteJid,
            { text: "❌ Message send nahi ho paya" },
            { quoted: message }
        );
    }
};
