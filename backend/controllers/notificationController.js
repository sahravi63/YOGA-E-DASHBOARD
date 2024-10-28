const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Send WhatsApp Message
exports.sendWhatsAppMessage = async (req, res) => {
  const { message, to } = req.body;

  try {
    await client.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`, // Use the environment variable
      to: `whatsapp:${to}`, // Use the "to" parameter from the request
      body: message,
    });

    res.status(200).json({ message: 'WhatsApp message sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};
