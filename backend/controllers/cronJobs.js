const cron = require('node-cron');
const { sendWhatsAppMessage } = require('./controllers/notificationController');

// Example cron job to send reminders daily
cron.schedule('0 9 * * *', async () => { // Every day at 9 AM
  const message = "Don't forget to meditate today!";
  const userNumbers = await getUsersToRemind(); // Fetch users who need reminders
  
  userNumbers.forEach(async (user) => {
    await sendWhatsAppMessage({ body: { message, to: user.phone } });
  });
});
