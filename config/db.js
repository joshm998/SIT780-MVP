const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;
Mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const db = Mongoose.connection;

db.on('error', () => {
    console.log(`Connection failed ${process.env.DB_URL}, Check if MongoDB is Running.`);
    process.exit();
});

db.once('open', () => {
    console.log('Connection Successful');
});

module.exports = db;