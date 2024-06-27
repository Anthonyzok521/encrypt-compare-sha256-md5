const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.set('views', './') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.get('/', (req,res)=>{
    res.render('index')
})

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
});