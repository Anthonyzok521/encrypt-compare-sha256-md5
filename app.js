const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const sha256 = require('js-sha256').sha256;
const md5 = require('md5');

app.set('views', './') // specify the views directory
app.set('view engine', 'ejs') // register the template engine
app.use(express.static(path.join(__dirname, '/')))
app.use(express.json())

app.get('/', (req,res)=>{
    res.render('index')
})

app.post('/', (req, res)=>{
    console.log('POST');
    const {text} = req.body;
    console.log(text);
    res.json({hash:'1234'});
})

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
});