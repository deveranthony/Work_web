const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = 3000;

const apiRoutes = require("./routes/apiRoutes")

const connectionString = 'mongodb://localhost:27017'

mongoose.connect(connectionString, {
    
})
.then(()=> {
    console.log('connection successful');
})
.catch(err =>{
    console.error('connection error', err);
});

app.get('/', (req,res)=>{
    res.json({message:"API running..."})
})

app.use('/api', apiRoutes)

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})