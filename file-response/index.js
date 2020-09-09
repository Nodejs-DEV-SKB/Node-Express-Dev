const express = require('express');
const http = require('http');

const app = new express();
app.use((req, res, next) =>{
    console.log(req.headers);
    res.statusCode = 200;
    res.end('Hello Express Js !');
})


const server = http.createServer(app)
server.listen(3000, 'localhost', () => {
    console.log('Server Running')
})