var fs = require('fs');
var http = require('http');

http.createServer(function(req, res) {
    fs.readFile('test.html', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(data);
        res.end();
    });
}).listen(3000);
console.log('Server started running');