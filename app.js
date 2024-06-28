const express = require('express');
const app = express();
const ejs = require('ejs');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;
const sha256 = require('js-sha256').sha256;
const md5 = require('md5');

const compare = (body) => {

    const { text, hash, algorithm } = body;

    const result = {
        match: false,
        hash: ""
    }

    if (algorithm == 'sha256') {
        const text_toSha256 = sha256(text);
        if (text_toSha256 == hash) {
            result.match = true;
        }
        result.hash = text_toSha256;
        
    }
    else if (algorithm == 'md5') {
        const text_toMD5 = md5(text);
        if (text_toMD5 == hash) {
            result.match = true;
        }
        result.hash = text_toMD5;
    }
    console.log(result);
    console.log(hash);
    return result;
}

app.set('views', './');
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {

    const resutl = compare(req.body);

    if (!resutl.match) {
        res.json({ message: 'Not match', hash: resutl.hash });
    }
    else{
        res.json({ message: 'Match', hash: resutl.hash });
    }
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});