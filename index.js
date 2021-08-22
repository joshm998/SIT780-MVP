const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload');
const app = express()
app.use(fileUpload());
require('dotenv').config()
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use("/api/", require("./routes/api"));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})