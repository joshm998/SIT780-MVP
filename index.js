const express = require('express')
const path = require('path')
const passport = require('passport');
const fileUpload = require('express-fileupload');
const app = express()
app.use(fileUpload());
require('dotenv').config()
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session')({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
});


const { userSchema } = require('./models/userModel');

const db = require('./config/db')
userSchema.plugin(passportLocalMongoose);
const UserDetails = db.model('User', userSchema);

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use("/api/", require("./routes/api"));
app.use("/", require("./routes/views"));
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})