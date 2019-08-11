const express = require('express');
const port = 8000;
const cookieParser = require('cookie-parser');
const app = express();
const expresslayout = require('express-ejs-layouts');
const userschema = require('./models/user');
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expresslayout);


app.set('layout extractStyles', true);
app.set('layout extractScript', true);



app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'SOCIAL',
    secret: 'parthsharma',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 1000)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));

app.listen(port, function(err) {
    if (err) {
        console.log(`ERROR OCCURRED : ${err}`);
    }
    console.log(`Server is running successfully at :${port}`);
});