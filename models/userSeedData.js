const User = require('../models/user');

// Sample user data
const sampleUsers = [
    { email: 'Zainab123@gmail.com', password: 'zainab', name: 'Zaynaba' },
    { email: 'Amal123@gmail.com', password: 'Amal', name: 'Amolah' },
    { email: 'Nour123@gmail.com', password: 'Nour', name: 'Noura' },
    { email: 'Hadia123@gmail.com', password: 'Hadia', name: 'Hadhodah' },
    { email: 'AhmedAlsemman@gmail.com', password: 'Ahmed', name: 'A Al-semman' },
    { email: 'AhmedSeliem@gmail.com', password: 'Ahmad', name: 'A Seliem' },
    { email: 'ZiadWaleed@gmail.com', password: 'ziad', name: 'Ziad' },
    { email: 'Mahmoud@gmail.com', password: 'Mahmoud', name: 'Mahmoud' },
    { email: 'Mohamed@gmail.com', password: 'Mohamed', name: 'Mohamed' },
];

// Function to seed sample users into the database
async function seedUsers() {
    try {
        // Inserting sample users into the database
        await User.insertMany(sampleUsers);
        console.log('Sample users added successfully');
    } catch (err) {
        console.log('Error adding sample users:', err);
    }
}

module.exports = seedUsers;