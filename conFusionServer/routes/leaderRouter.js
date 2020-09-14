const express = require('express')
const bodyParser = require('body-parser')
const leaderRouter = express.Router()
leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the leader to you!');
})
.post((req,res,next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.end('Put Method is not applicable !!! ');
})
.delete((req,res,next) => {
    res.end('Deleting all leaders');
});


leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the leader: ' + req.params.leaderId  + ' to you!');
})
.post((req,res,next) => {
    res.end('Post is not applicable');
})
.put((req,res,next) => {
    res.write('Updating the leader: ' + req.params.leaderId  + '\n');
    res.end('Will update the leader: ' + req.body.name +
        ' with details: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('Deleting leader: ' + req.params.leaderId );
});


module.exports = leaderRouter;