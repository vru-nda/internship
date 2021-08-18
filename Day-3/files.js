var fs = require("fs");
var path = require('path');

console.log('Going to create a new directory');
fs.mkdir(path.join(__dirname, 'test'), (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory Created successfully!');
});

console.log('Going to create a new file');
fs.appendFile('input.txt', 'Hello content!', function(err) {
    if (err) throw err;
    console.log('New file created successfully!');

    console.log("Going to open file!");
    fs.open('input.txt', 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("File opened successfully!");

        console.log("Going to write into existing file");
        fs.writeFile('input.txt', 'Changing the text with write File function in NodeJS!', function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("Data written successfully!");

            console.log("Let's read newly written data");
            fs.readFile('input.txt', function(err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log(data.toString());

                console.log("Let's rename the file name");
                fs.rename('input.txt', 'demo.txt', function(err) {
                    if (err) {
                        console.log.err;
                    }
                    console.log('File renamed');

                    console.log('Going to delete the file!');
                    fs.unlink('demo.txt', function(err) {
                        if (err) throw err;
                        console.log('File deleted!');
                    });
                });
            });
        });
    });
});