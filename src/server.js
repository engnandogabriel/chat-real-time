const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path')
const app = express();

const serverHttp = http.createServer(app); //criação do server


const io = require('socket.io')(serverHttp,{
    cors: {
        origin: '*',
    }
}); //criação do socket

app.use(express.static(path.join(__dirname, "..", 'public')));
app.set('views', path.join(__dirname, 'public'));

/*
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/home', (req,res) => {
    res.render('home.html');
})
*/


module.exports = {serverHttp,io};