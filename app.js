const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const sha256 = require('js-sha256').sha256;
const md5 = require('md5');

const compare = (body) =>{
    
    const {text, hash, algorithm} = body;

    if(algorithm == 'sha256'){
        const hash_256 = sha256(text);
        
    }

    if(new_hash == old_hash){
        return true;
    }
    return false;
}

app.set('views', './');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());

app.get('/', (req,res)=>{
    res.render('index')
})

app.post('/', (req, res)=>{
    
    if(!compare(req.body)){
        res.json({message:'Not match'});
    }
    res.json({message:'Match'});
})

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
});