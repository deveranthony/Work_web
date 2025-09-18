const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = 3000;



const connectionString = 'mongodb://localhost:27017'

mongoose.connect(connectionString, {
    
})
.then(()=> {
    console.log('connection successful');
})
.catch(err =>{
    console.error('connection error', err);
});


app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})