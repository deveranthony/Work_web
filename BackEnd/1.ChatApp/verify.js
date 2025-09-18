const mongoose = require('mongoose');
const ChatMessage = require('./chatSchema');

const connectionString = 'mongodb://localhost:27017';

async function main() {
    await mongoose.connect(connectionString, {
        
    });
    console.log('connection successful');
    const count = await ChatMessage.countDocuments();
    console.log(`Total documents: ${count}`);
    const docs = await ChatMessage.find().limit(10).exec();
    console.log('Sample documents:', docs);
    mongoose.connection.close();
}

main().catch(err => console.error('Error:', err));