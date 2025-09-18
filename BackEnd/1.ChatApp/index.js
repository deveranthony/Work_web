const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const connetionString = 'mongodb+srv://Onora:asdJKL123!@#@cluster0.qbdkl9j.mongodb.net/'

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})