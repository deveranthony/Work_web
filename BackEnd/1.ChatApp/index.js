const express = require('express');
const app = express();
const prot = 3000;

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(prot, ()=>{
    console.log(`Example app listening on port ${prot}`);
})