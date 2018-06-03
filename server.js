const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const urlencodedParser =  bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json();

app.post('/login', jsonParser, (req, res) => {
    console.log(req.body.username);
    res.json('yes');
});

app.post('/signup', jsonParser, (req, res) => {
    console.log(req.body.username);
    res.json('yes');
});

const port = 3003;

app.listen(port, () => console.log(`Server started on port ${port}`));