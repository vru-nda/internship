function greet() {
    console.log('Hey there!');
}

function callme(name) {
    console.log('Hey' + ' ' + name);
}

setTimeout(greet, 3000);
callme('Vrunda');