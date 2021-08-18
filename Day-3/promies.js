var myPromise = new Promise(function(resolve, reject) {
    const a = 500;
    const b = 600;

    if (a === b) {
        resolve();
    } else {
        reject();
    }
});

myPromise
    .then(function() {
        console.log('Success');
    })
    .catch(function() {
        console.log('Error');
    });