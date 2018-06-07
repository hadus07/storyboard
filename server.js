const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');

const db = mongojs('storyboard', ['users']);

const app = express();

const urlencodedParser =  bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json();

global.auth = 'no';
global.message = '';
global.fullname = '';
global.username = '';

app.post('/login', jsonParser, (req, res) => {

    const user = {
        username: req.body.username,
        password: req.body.password
    };

    db.users.find(user, (err, doc) => {
        if(doc.length === 1) {
            global.auth = 'yes';
            global.message = '';
            global.fullname = doc[0].fullname;
            global.username = doc[0].username;

            res.json({
                access: global.auth,
                message: message || '',
                fullname: global.fullname,
                username: global.username,
            });
        }else {
            global.auth = 'no';
            global.message = 'User does not exist';
            global.username = '';
            global.fullname = '';
            res.json({
                access: global.auth,
                message: message || '',
                fullname: global.fullname,
                username: global.username,
            });
        }
    })
});

app.post('/signup', jsonParser, (req, res) => {
    
    const user = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    db.users.find(user, (err, doc) => {
        if(doc.length === 1) {
            global.auth = 'no';
            global.message = 'User already exists';
            global.fullname = '';
            global.username = '';

            res.json({
                access: global.auth,
                message: global.message || '',
                fullname: global.fullname,
                username: global.username
            });
        }else {
            db.users.insert(user, (err, inserted_doc) => {
                global.auth = 'yes',
                global.message = '',
                global.fullname = inserted_doc.fullname,
                global.username = inserted_doc.username

                res.json({
                    access: global.auth,
                    message: global.message || '',
                    fullname: global.fullname,
                    username: global.username
                });
            });
        }
    });
});

app.get('/editor', (req, res) => {
    res.json({
        access: global.auth,
        message: global.message || '',
        fullname: global.fullname,
        username: global.username
    });
});

const port = 3003;

app.listen(port, () => console.log(`Server started on port ${port}`));