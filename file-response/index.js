const express = require('express');
const http = require('http');
const morgan = require('morgan')

const app = new express();
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))
app.use((req, res, next) =>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello Express Js !');
})

const server = http.createServer(app);
server.listen(3000, 'localhost', () => {
    console.log('Server Running');
})