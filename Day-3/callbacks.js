function greet(name, callback) {
    console.log("Hey" + " " + name);
    callback();
}

function fun() {
    console.log('This is the callback function!');
}

greet('Vrunda', fun);