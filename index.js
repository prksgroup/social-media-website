const express = require('express');
const port = 8500;
const app = express();
const cookieparser = require('cookie-parser');
const expresslayout = require('express-ejs-layouts');
//const userschema = require('./models/user');
const db = require('./config/mongoose');
//const postdb = require('./models/post');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const mongo = require('connect-mongo')(session);
const sassmiddleware = require('node-sass-middleware');

app.use(sassmiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.urlencoded());

app.use(cookieparser());
app.use(express.static('./assets'));
app.use(expresslayout);


app.set('layout extractStyles', true);
app.set('layout extractScript', true);



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'SOCIAL',
    secret: 'PARTH',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new mongo({
        mongooseConnection: db,
        autoremove: 'disabled'
    }, function(err) { console.log(err || 'OKAY WORKING SUCCESSFULLY') })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes/index'));

app.listen(port, function(err) {
    if (err) {
        console.log(`ERROR OCCURRED : ${err}`);
    }
    console.log(`Server is running successfully at :${port}`);
});

















//const session = require('express-session');
// const passport = require('passport');
// const passportlocal = require('./config/passport');
// const sassmiddleware = require('node-sass-middleware');






// app.use(session({
//     name: 'SOCIAL',
//     secret: 'parthsharma',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 1000)
//     }
// }));

// app.use(passport.initialize());
// app.use(passport.session());
