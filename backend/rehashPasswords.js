const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./db/User'); // Adjust the path as needed

async function rehashPasswords() {
    try {
        const users = await User.find(); // Get all users

        for (const user of users) {
            try {
                const newHash = await bcrypt.hash(user.password, 10); // Hash the existing password
                user.password = newHash; // Update the password field
                await user.save(); // Save the updated user
                console.log(`Updated password for user: ${user.email}`);
            } catch (err) {
                console.error(`Error updating password for user: ${user.email}`, err);
            }
        }

        console.log('All passwords have been rehashed.');
    } catch (err) {
        console.error('Error fetching users:', err);
    } finally {
        mongoose.connection.close(); // Close the database connection
    }
}

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(rehashPasswords)
    .catch(err => console.error('Error connecting to the database:', err));
