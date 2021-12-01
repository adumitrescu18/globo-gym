const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://rdbj:12345@cluster0.rnldh.mongodb.net/testGloboBikes?retryWrites=true&w=majority'; // use this for local dev
// db.url = process.env.MONGODB_URI; // use this for prod dev
module.exports = db;
