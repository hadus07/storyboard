const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const nodemailer = require('nodemailer');

// Database init
const db = mongojs('storyboard', ['users']);

// Server init
const app = express();

// Middleware init
const urlencodedParser =  bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json();

// Global vars
global.auth = 'no';
global.message = '';
global.fullname = '';
global.username = '';
global.email = '';
global.stories = [];
// Mailer options
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'storyboard.bi@gmail.com',
        pass: 'storyboard07'
    }
});


// Login handle
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

//Signup handle
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
                global.auth = 'yes';
                global.message = '';
                global.fullname = inserted_doc.fullname;
                global.username = inserted_doc.username;
                global.email = inserted_doc.email;

                res.json({
                    access: global.auth,
                    message: global.message || '',
                    fullname: global.fullname,
                    username: global.username
                });
            });
        }
    });

    let mail = {
        from: 'storyboard.bi@gmail.com',
        to: user.email,
        subject: 'Welcome to StoryBoard',
        text: `Dear ${user.fullname}!\n\nYou have successfuly joined to Storyboard, one of the best online story writing community in the world.\nCreate your stories without warrying about the storage and promotion.\n\nFeel free to reply us if you have any questions\n\nSincerely,\n\nIbrohim Bahromov (Storyboard)`
    };

    transporter.sendMail(mail, (err, info) => {
        if(err)
          console.log(err)
        else
          console.log(info);

          transporter.close();
    });
});

// Editor handle
app.post('/editor', jsonParser, (req, res) => {

    const storyname = req.body.storyname;
    db.users.findAndModify({
        query: {
            username: req.body.username,
        },
        update: {$push: {stories: {
            storyname: req.body.storyname,
            category: req.body.category,
            content: req.body.content,
        }}},
        new: true
    }, (err, doc) => {
        console.log('Story submitted');
    });

    db.stories.insert({
        storyname: req.body.storyname,
        category: req.body.category,
        username: req.body.username,
        content: req.body.content
    }, (err, doc) => {});
});

// Dashboard handle
app.post('/dashboard', jsonParser, (req, res) => {
    let user = {
        username: req.body.username,
    }
    db.users.find(user, (err, doc) => {
        res.json(doc[0].stories);
    });
});

// Delete handle
app.post('/deleteStory', jsonParser, (req, res) => {
    let user = {
        username: req.body.username,
    }

    db.stories.remove({
        storyname: req.body.storyname
    }, (err, doc) => {});

    db.users.update(user, {
        $pull: {
            stories: {
                storyname: req.body.storyname
            }
        }
    }, (err, doc) => {
        console.log(doc);
    });

    db.users.find(user, (err, doc) => {
        global.stories = doc[0].stories;
    })
    res.json(global.stories);
});

// quotes = require('./quotes.json');
// console.log(quotes[0]);
// db.quotes.insert({quotes: quotes}, (err, doc) => {
//     console.log(doc);
// });

app.post('/quotes', jsonParser, (req, res) => {
    db.quotes.find({}, (err, doc) => {
        let rand = Math.floor(Math.random() * doc[0]['quotes'].length);

        let data = {
            author: doc[0].quotes[rand]['quoteAuthor'],
            quote: doc[0].quotes[rand]['quoteText']
        };

        res.json(data);
    });
});

app.post('/randomStory', jsonParser, (req, res) => {
   db.users.find({}, (err, doc) => {
        let rand = Math.floor(Math.random() * doc.length);
        let data = doc[rand];
        let l = data.stories.length;
        let rand2 = Math.floor(Math.random() * l);

        let leavingData = doc[rand].stories[rand2];

        res.json({
            content: leavingData.content,
            storyname: leavingData.storyname,
            author: doc[rand].fullname,
        });

   });
});


// Search handle
app.post('/search', jsonParser, (req, res) => {
    if(req.body.query === '') {
        db.users.find({}, (err, doc) => {
            let stories = [];
            let n = 0;
            for(let i=0; i<doc.length; i++) {
                for(let j=0; j<doc[i].stories.length; j++) {
                    stories[n] = doc[i].stories[j];
                    n++;
                }
            } 
            res.json(stories);
        });
    }else {
        db.users.find({}, (err, doc) => {
            let stories = [];
            let n = 0;
            for(let i=0; i<doc.length; i++) {
                for(let j=0; j<doc[i].stories.length; j++) {
                    if(doc[i].stories[j].storyname.slice(0,3) === req.body.query) {
                        stories[n] = doc[i].stories[j];
                        n++;
                    }
                }
            }
            res.json(stories);
        });
    }
});
// Server listen
const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));