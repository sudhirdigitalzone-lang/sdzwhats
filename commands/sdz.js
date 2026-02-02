module.exports = async (sock, message, args) => {
    try {
        if (!args[0]) {
            return await sock.sendMessage(
                message.key.remoteJid,
                { text: '❌ Usage:\n.sdz 91XXXXXXXXXX' },
                { quoted: message }
            );
        }

        let number = args[0].replace(/\D/g, '');
        if (!number.startsWith('91')) number = '91' + number;

        const jid = `${number}@s.whatsapp.net`;

        // ✅ check WhatsApp registration
        const [check] = await sock.onWhatsApp(jid);
        if (!check || !check.exists) {
            return await sock.sendMessage(
                message.key.remoteJid,
                { text: '❌ Number is not registered on WhatsApp.' },
                { quoted: message }
            );
        }

        const text = `👋 Hello!

This is an automated message from SDZ Bot 🤖
Please do not reply.

Thank you 😊`;

        await sock.sendPresenceUpdate('composing', jid);
        await sock.sendMessage(jid, { text });

        await sock.sendMessage(
            message.key.remoteJid,
            { text: `✅ Message successfully sent to ${number}` },
            { quoted: message }
        );

    } catch (err) {
        console.error('SDZ ERROR:', err);
        await sock.sendMessage(
            message.key.remoteJid,
            { text: '❌ Error while sending message.' },
            { quoted: message }
        );
    }
};
