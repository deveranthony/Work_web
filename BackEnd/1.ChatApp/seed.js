const ChatMessage = require('./chatSchema');
const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017'

async function main() {
    try{
        await
        mongoose.connect(connectionString, {
            
        });
        console.log('connection successful');
        
        const message = [
            {username: 'Alice', message: 'Hello!'},
            {username: 'Bob', message: 'Hi there!'},
            {username: 'Charlie', message: 'Good morning!'},
        ];
        const docs = await ChatMessage.insertMany(message);
        console.log('Inserted documents:', docs);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

main();