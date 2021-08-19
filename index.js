const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})