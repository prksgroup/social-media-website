const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social');
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'ERROR PCCURED DURING CONNECTING TO DATBASE'));
database.once('open', function() {
    console.log('database IS SUCCESSFULLY CONNECTED WITH INDEX.JS');
});
module.exports = database;