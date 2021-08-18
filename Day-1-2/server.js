var http = require('http');

http.createServer(function(req, res) {
    res.end('Welcome to nodejs!');
}).listen(1010);
console.log('Server started running at port no 1010!');